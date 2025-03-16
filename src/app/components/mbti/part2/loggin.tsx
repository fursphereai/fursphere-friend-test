import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Loggin() {

    const [logginEmail, setLogginEmail] = useState('');
    const [logginEmailValid, setLogginEmailValid] = useState(false);
    
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



    const validateAndSubmit = async () => {
        setShowSignup(false);
        setShowLogin(true);
        console.log("userInputCode" + logginInputCode);
        console.log("verificationCode" + logginVerificationCode);
        console.log("email" + logginEmail);
        // Check if email exists and is valid
        if (!logginEmail || !setLogginEmailValid) {
            setLogginError('Please enter a valid email address');
            return;
        }
      
        // Check if verification code was sent
        if (!isCodeSent) {
            setLogginError('Please request and enter verification code');
            return;
        }
      
        // Check if verification code matches
        if (!logginInputCode || logginInputCode !== logginVerificationCode) {
            setLogginError('Invalid verification code');
            return;
        }
      
        try {
          console.log("userInputCodetesting" + logginInputCode);
            setLogginIsValidating(true);
            // Here you can add your API call to submit the result
            setLogginIsValidated(true);
            
            setShowSignup(false);
            setShowLogin(true);
            // Proceed with your result submission logic
            console.log('Validation successful');
        } catch (error) {
            setLogginError('Failed to validate. Please try again.');
        } finally {
            setLogginIsValidating(false);
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
    if (!canResend) return;
    
    console.log("1. Starting send process");
    setLogginSendingCode(true);
    
    try {
        console.log("2. Setting countdown");
        await sendVerificationCode();
        setCanResend(false);
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
                logginEmail,
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
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2}}
    >
    <motion.div  className="bg-white w-[768px] h-[527px] rounded-[22px]"
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

        <div className="text-[48px] bg-yellow-500 font-[Ubuntu] font-[500] text-[#505D90] leading-[48px]">
        <h2>🐾</h2>
        </div>
        <div className="text-[48px] font-[Ubuntu] font-[600] text-[#505D90] bg-red-500 leading-[48px] line-height-[57.6px] tracking-[-1.92px]">
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
            w-[306px] 
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
            ${!logginEmailValid && logginEmail !== '' 
            ? 'border-[#E35C5C]' 
            : logginEmail && logginEmailValid 
                ? 'border-green-500' 
                : 'border-[#717680]'}
            `}
        value={logginEmail}
        onChange={handleEmailChange}
        // onBlur={() => setLogginEmailValid(validateEmail(logginEmail) || logginEmail === '')}
        required
        />

        <button className= {`mt-[20px] w-[149px] h-[44px] rounded-[22px] 
        ${!canResend ? 'bg-[#C3C3C3]' : 'bg-[#5777D0]'} 
        flex items-center justify-center 
        text-[16px] font-[Inter] font-[600] text-white
        `}
        onClick={handleSendCode}
        disabled={logginSendingCode || !logginEmailValid || logginEmail === ''}
        >
       {!canResend 
       ?  `${countdown}`  
       : 
          'Send Code'}
        </button>

        {logginChecking && (
                <div className="mt-2 text-gray-500 text-sm font-[Inter] flex items-center">
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Checking email availability...
                </div>
        )}

        </div>

        {!logginEmailValid && logginEmail !== '' && (
         <div className="mt-[8px] flex flex-col items-center justify-center  max-w-[467px] w-full text-[#E35C5C] text-[14px] font-[Inter] leading-[14px]">
            *Invalid email. Please enter a valid email address
        </div>
        )}

        {(() => {
            const shouldShowError = !logginEmailAvailable && !logginChecking && logginEmailValid && logginEmail !== '';
            console.log('Email Status:', {
                logginEmailAvailable,
                logginChecking,
                shouldShowError
            });
            
            return shouldShowError && (
            <div className="mt-[8px] flex flex-col items-center justify-center max-w-[467px] w-full text-[#5777D0] text-[14px] font-[Inter] leading-[14px]">
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
            );
        })()}

        <div className = "flex flex-col bg-yellow-500 items-start justify-center">
        <input
        type="text"
        placeholder="Enter 6-digit code"
        className= {`
            w-[467px] 
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
            ${logginError ? 'border-red-500' : 'border-[#717680]'}
            `}
            value={logginInputCode}
            onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value.length <= 6) {
                    setLogginInputCode(value);
                    setLogginError('');
                }
            }}
            maxLength={6}
        />

   

        </div>

        
        
        <button className="mt-[80px] w-[145px] h-[44px] rounded-[22px] bg-[#5777D0] flex items-center justify-center"
        onClick={validateAndSubmit}
        disabled={logginIsValidating || !logginEmail || !logginEmailValid || !isCodeSent || !logginInputCode}
        >
        <h2 className="text-[16px] font-[Inter] font-[600] text-white">
        {logginIsValidating ? 'Validating...' : 'Get Result'}
        </h2>
        </button>

        {logginIsValidated && (
        <div className="mt-2 text-green-500 text-sm font-[Inter] flex items-center justify-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M5 13l4 4L19 7" 
                />
            </svg>
            Validation successful!
        </div>
)}


        
        
    </div>
    
    
    
    </motion.div>
</motion.div>
);
}