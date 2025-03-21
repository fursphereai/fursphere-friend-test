import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

interface LogginProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Loggin({ handleNext, setStep, setShowSignup, setShowLogin, setShowEmail }: LogginProps) {

    const [logginEmail, setLogginEmail] = useState('');
    const [logginEmailValid, setLogginEmailValid] = useState(false);
    const [showInvalidEmail, setShowInvalidEmail] = useState(false);
    const [showBlankEmail, setShowBlankEmail] = useState(false);
    const [showEmailAvailable, setShowEmailAvailable] = useState(false);
    const [showIncorrectCode, setShowIncorrectCode] = useState(false);
    
    
    const [logginSendingCode, setLogginSendingCode] = useState(false);
    const [logginChecking, setLogginChecking] = useState(false);
    const [logginEmailAvailable, setLogginEmailAvailable] = useState(false);
    const [logginError, setLogginError] = useState<string>('');
    const [logginIsValidated, setLogginIsValidated] = useState(false);
    const [logginIsValidating, setLogginIsValidating] = useState(false);

    const [logginInputCode, setLogginInputCode] = useState('');
    const [logginVerificationCode, setLogginVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);


    const validateEmail = (email: string) => {
        if (!email) return true; // Return true for empty input
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email.trim());
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowInvalidEmail(false);
        setShowBlankEmail(false);
        setShowEmailAvailable(false);
    
        const newEmail = e.target.value;
        setLogginEmail(newEmail);
        setLogginEmailValid(validateEmail(newEmail));
      
    
        if (validateEmail(newEmail) && newEmail !== '') {
          console.log("newEmail" + newEmail);
          checkEmailAvailability(newEmail);
          // setIsEmailAvailable(true);
    
      } 
      };


      const checkEmailAvailability = async (email: string) => {
        try {
          if (email === 'likey6688@gmail.com' || email === '1173830105@qq.com') {
            setShowEmailAvailable(true);
            setLogginChecking(true);
            setLogginEmailAvailable(true);
          } else {
            setLogginChecking(true);
            // const response = await fetch('/api/check-email', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email })
            // });
            // const data = await response.json();
            // setIsEmailAvailable(data.available);
            console.log("isChecking" + logginChecking);
            console.log("email" + email);
            setLogginEmailAvailable(false);
            console.log("isEmailAvailable" + logginEmailAvailable);
          }
        } catch (error) {
            console.error('Error checking email:', error);
        } finally {
            setLogginChecking(false);
            console.log("isChecking" + logginChecking);
        }
      };


    const router = useRouter(); 

const validateAndSubmit = async () => {
    // ... existing validation code ...


    if (logginEmail && !logginEmailValid) {
        setShowInvalidEmail(true);

        return;
        } else if (!logginEmail) {
        setShowBlankEmail(true);
        return;
        };
    
    try {
    
        if (logginInputCode === logginVerificationCode && logginInputCode.length == 6) {

        setLogginIsValidated(true);
        setStep(20);
        console.log('Validation successful');

        } else {
        setShowIncorrectCode(true);
        setLogginIsValidated(false);
        setLogginError('Incorrect verification code.');
        }
    } catch (error) {
        setLogginError('Failed to validate. Please try again.');
    } finally {
        setLogginIsValidating(true);
    }
    };
    
//count down 60s
const [countdown, setCountdown] = useState(0);
const [canResend, setCanResend] = useState(true);

// Handle countdown
useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (countdown > 0) {
        console.log(`Countdown: ${countdown}`);
        timer = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    setCanResend(true);
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);
    }

    return () => {
        if (timer) clearInterval(timer);
    };
}, [countdown]);

const handleSendCode = async () => {
    console.log("canResend" + canResend);
    if (!canResend) return;
    
    if (canResend && logginEmail && !logginEmailValid) {
        setShowInvalidEmail(true);
        return;
        } else if (canResend && !logginEmail) {
        setShowBlankEmail(true);
        return;
    }

    setLogginSendingCode(true);
    
    try {
    
        setCanResend(false);
        sendVerificationCode();
        setCountdown(5);
        
        console.log("3. Resetting send state");
        setLogginSendingCode(false);
        
    } catch (error) {
        console.error('Error:', error);
        setCanResend(true);
        setCountdown(0);
        setLogginSendingCode(false);
    }
};

const sendVerificationCode = async () => {
    if (!logginEmail || !setLogginEmailValid) return;
    
    setLogginSendingCode(true);
    try {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setLogginVerificationCode(code);

        const response = await fetch('/api/proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'send_verification',
                email: logginEmail,
                code,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error('Invalid email address');
                case 429:
                    throw new Error('Too many attempts. Please try again later');
                case 500:
                    throw new Error('Server error. Please try again later');
                default:
                    throw new Error(data.message || 'Failed to send code');
            }
        }

        setIsCodeSent(true);
    } catch (error: any) {
        console.error('Error sending code:', error);
    
        setIsCodeSent(false);
    } finally {
        setLogginSendingCode(false);
    }
};






return (
    <motion.div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    // exit={{ opacity: 0 }}
    // transition={{ duration: 0.2}}
    >
    <motion.div  className={`bg-white  w-full md:w-[768px] h-full  transition-[height] duration-300 ease-in-out ${
        ((showInvalidEmail || showBlankEmail || showEmailAvailable) && showIncorrectCode)
        ? 'md:h-[567px]' 
        : (showInvalidEmail || showBlankEmail || showEmailAvailable || showIncorrectCode)
          ? 'md:h-[552px]' 
          : 'md:h-[527px]'
     } rounded-[0px] md:rounded-[22px]`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        duration: 0.3
                    }}
    >
    <div className="flex flex-col items-center justify-center w-auto h-auto mt-[80px]">

        <div className="text-[32px] md:text-[48px] bg-yellow-500 font-[Ubuntu] font-[500] text-[#505D90] leading-[38.4px] md:leading-[48px]">
        <h2>🐾</h2>
        </div>
        <div className="text-[32px] md:text-[48px] font-[Ubuntu] font-[600] text-[#505D90] leading-[38.4px] md:leading-[57.6px] line-height-[38.4px] md:line-height-[57.6px] tracking-[-1.28px] md:tracking-[-1.92px]">
        <h2>Log in & get result!</h2>
        </div>
        <div className="mt-[20px] bg-red-500 text-[16px] font-[Inter] font-[400] text-[#101828] leading-[16px]">
            <h2>Welcome back! 🥰</h2>
        </div>
        <div className="relative bg-yellow-500 w-full flex flex-row items-center justify-center gap-[12px]">
        <input
        type="email"
        placeholder="Enter your email"
        className= {`
            w-[320px] md:w-[306px] 
            h-[44px]
            mt-[40px] md:mt-[20px]
            py-[12px] pl-[12px] 
            border border-[1px] 
            rounded-[22px]
            bg-white
            font-[Inter]
            text-[16px] text-[#27355D] font-[400]
            focus:outline-none
            placeholder:[#C3C3C3] 
            placeholder:text-[16px] 
            ${showInvalidEmail || showBlankEmail 
            ? 'border-[#E35C5C]' 
            : 'border-[#717680]'}
            `}
        value={logginEmail}
        onChange={handleEmailChange}
        // onBlur={() => setLogginEmailValid(validateEmail(logginEmail) || logginEmail === '')}
        required
        />

        <button className= {`md:flex hidden mt-[20px] w-[149px] h-[44px] rounded-[22px] 
        ${!canResend ? 'bg-[#C3C3C3]' : 'bg-[#5777D0]'} 
        flex items-center justify-center 
        text-[16px] font-[Inter] font-[600] text-white
        `}
        onClick={handleSendCode}
      
        >
       {!canResend 
       ?  `${countdown}`  
       : 
          'Send Code'}
        </button>


        </div>

        {showInvalidEmail && (
         <div className="mt-[8px] flex flex-col items-center justify-center  max-w-[467px] w-full text-[#E35C5C] text-[14px] font-[Inter] leading-[14px]">
            *Invalid email. Please enter a valid email address
        </div>
        )}
        {showBlankEmail && (
         <div className="mt-[8px] flex flex-col items-center justify-center  max-w-[467px] w-full text-[#E35C5C] text-[14px] font-[Inter] leading-[14px]">
            *Please enter a valid email address
        </div>
        )}

        {showEmailAvailable && (
            <div className="hidden md:flex mt-[8px] flex flex-col items-center justify-center max-w-[467px] w-full text-[#5777D0] text-[14px] font-[Inter] leading-[14px]">
                    <div className=" w-full flex flex-row justify-start items-center gap-1">
                        Oops, this email doesn't have an account. You can keep
                        <span 
                        className=" cursor-pointer underline hover:text-yellow-700 transition-colors"
                        onClick={() =>
                            {}
                        }
                        > 
                        Sign up
                        </span>
                        with
                    </div>
                    <div className="w-full flex flex-row justify-start items-center">
                    with this email using a verification code or try a different one.
                    </div>
            </div>
            )}

           {showEmailAvailable && (
            <div className="md:hidden w-[320px] mt-[8px] bg-yellow-500 flex flex-col items-left justify-center  text-[#5777D0] text-[14px] font-[Inter] leading-[14px]">
                Oops, this email doesn't have an account. You
                    <div className=" w-full flex flex-row justify-start items-center gap-1">
                        
                        can keep
                        <span 
                        className=" cursor-pointer underline hover:text-yellow-700 transition-colors"
                        onClick={() =>
                            {}
                        }
                        > 
                        Sign up
                        </span>
                        with this email using a
                    </div>
                    <div className="w-full flex flex-row justify-start items-center">
                    verification code or try a different one.
                    </div>
            </div>
            )}

        <div className = "flex flex-row w-[320px] md:w-[467px] md:flex-col bg-yellow-500 items-center justify-between md:justify-center">
            <button className= {` md:hidden mt-[20px] w-[116px] h-[44px] rounded-[22px] 
            ${!canResend ? 'bg-[#C3C3C3]' : 'bg-[#5777D0]'} 
            flex items-center justify-center 
            text-[16px] font-[Inter] font-[600] text-white
            `}
            onClick={handleSendCode}
          
            >
        {!canResend 
        ?  `${countdown}`  
        : 
            'Send Code'}
            </button>
        <input
        type="text"
        placeholder="Enter 6-digit code"
        className= {`
            w-[194px] md:w-[467px] 
            h-[44px]
            mt-[20px]
            py-[12px] pl-[12px] 
            border border-[1px] 
            rounded-[22px]
            bg-white
            font-[Inter]
            text-[16px] text-[#27355D] font-[400]
            focus:outline-none
            placeholder:[#C3C3C3] 
            placeholder:text-[16px] 
            ${showIncorrectCode ? 'border-[#E35C5C]' : 'border-[#717680]'}
            `}
            value={logginInputCode}
            onChange={(e) => {
                setShowIncorrectCode(false);
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 6) {
                    setLogginInputCode(value);
                    setLogginError('');
                }
            }}
            maxLength={6}
        />

        </div>
        {showIncorrectCode && (
              <div className="w-[320px] md:w-[467px] bg-yellow-500 text-left mt-[8px] text-[#E35C5C] text-[14px] font-[Inter] leading-[14px]">
                *Incorrect verification code.
              </div>
        )}
        

        
        
        <button className="absolute md:static bottom-[48px] md:bottom-auto mt-[80px] w-[145px] h-[44px] rounded-[22px] bg-[#5777D0] flex items-center justify-center"
        onClick={validateAndSubmit}
        // disabled={logginIsValidating || !logginEmail || !logginEmailValid || !isCodeSent || !logginInputCode}
        >
        <h2 className="text-[16px] font-[Inter] font-[600] text-white">
         Get Result
        </h2>
        </button>



        
        
    </div>
    
    
    
    </motion.div>
</motion.div>
);
}