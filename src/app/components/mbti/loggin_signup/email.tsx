import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleSubmit } from '../submit_result'; 
import { getResult } from '../get_result';

interface SurveyData {
  user_info: {
    name: string;
    email: string;
    ip: string;
    mbti: string;
  };
  pet_info: {
    PetSpecies: string;
    PetBreed: string;
    PetGender: string;
    PetSex: string;
    PetAge: string;
    PetName: string;
    PetPhoto: string;
  };
  personality_and_behavior: {
    Energy_Socialization: {
      seek_attention: string;
      interact_with_toys: string;
      stranger_enter_territory: string;
    };
    Routin_Curiosity: {
      prefer_routine: string;
      friend_visit_behaviors: string;
      fur_care_7days: string;
    };
    Decision_Making: {
      react_when_sad: string;
      toy_out_of_reach: string;
      react_new_friend: string;
    };
    Structure_Spontaneity: {
      react_new_environment: string;
      respond_to_scold: string;
      follow_commands: string;
    };
  };
}

interface EmailProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleNext: () => void;
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEmail: React.Dispatch<React.SetStateAction<boolean>>;
  surveyData: SurveyData;
  aiResult: any;
  setAiResult: React.Dispatch<React.SetStateAction<any>>;
  setResult1: React.Dispatch<React.SetStateAction<boolean>>;
}

    export default function Email({ handleNext, setStep, setShowSignup, setShowLogin, setShowEmail, surveyData, aiResult, setAiResult, setResult1}: EmailProps) {

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [showInvalidEmail, setShowInvalidEmail] = useState(false);
    const [showBlankEmail, setShowBlankEmail] = useState(false);
    const [showEmailUsed, setShowEmailUsed] = useState(false);
    const [showEmailRegistered, setShowEmailRegistered] = useState(false);
    

    const [sendingCode, setSendingCode] = useState(false);
    const [checking, setChecking] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState(false);
    const [error, setError] = useState<string>('');
    const [isValidated, setIsValidated] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    const [inputCode, setInputCode] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);


    const validateEmail = (email: string) => {
        if (!email) return true; // Return true for empty input
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email.trim());
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setShowInvalidEmail(false);
       setShowBlankEmail(false);
       setShowEmailUsed(false);
       setShowEmailRegistered(false);
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailValid(validateEmail(newEmail));
      
    
        if (validateEmail(newEmail) && newEmail !== '') {
          console.log("newEmail" + newEmail);
          checkEmailAvailability(newEmail);
          // setIsEmailAvailable(true);
    
      } 
      };


      const checkEmailAvailability = async (email: string) => {
        try {
          if (email === 'likey6688@gmail.co') {
      
            setChecking(true);
            setEmailAvailable(true);
            console.log("surveyData" + JSON.stringify(surveyData));
          } else if(email === 'likey6688@gmail.com' || email === '1173830105@qq.com') {
            setChecking(true);
            setShowEmailUsed(true);
            // const response = await fetch('/api/check-email', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email })
            // });
            // const data = await response.json();
            // setIsEmailAvailable(data.available);
            setEmailAvailable(false);
          } else if(email === 'likey6688@gmail.comm') {
            setChecking(true);
            setShowEmailRegistered(true);
            setEmailAvailable(false);
          }
        } catch (error) {
            console.error('Error checking email:', error);
        } finally {
            setChecking(false);
            console.log("isChecking" + checking);
        }
      };




const GetAiResult = async(surveyData: SurveyData) => {
  try {
    const response = await handleSubmit(surveyData);
    
    if (response) {
     
      const resultData = await getResult(response.submission_id);
      setAiResult(resultData);
      console.log("resultData" + JSON.stringify(resultData));
      setShowEmail(false);
      setResult1(true);
      
    } else {
      console.error('Submission failed');
    }
  } catch (error) {
    console.error('Error submitting survey:', error);
  }
};

    const validateAndSubmit = async () => {
        // ... existing validation code ...
        if (email && !emailValid) {
          setShowInvalidEmail(true);
          return;
        } else if (!email) {
          setShowBlankEmail(true);
          return;
        };
      
        try {
            console.log("userInputCodetesting" + inputCode);
            setIsValidating(true);     
            setIsValidated(true);
            // Add navigation to page 20
            GetAiResult(surveyData);
            console.log("surveyData" + JSON.stringify(surveyData));
            


            
            
            console.log('Validation successful');
        } catch (error) {
            setError('Failed to validate. Please try again.');
        } finally {
            setIsValidating(false);
        }
    };



  

return (
    <motion.div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    // initial={{ opacity: 0 }}
    // animate={{ opacity: 1 }}
    // exit={{ opacity: 0 }}
    // transition={{ duration: 0.4}}
  >
      <motion.div  className="relative bg-white w-full md:w-[768px] h-full md:h-[563px] rounded-[0px] md:rounded-[22px] flex flex-col"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    duration: 0.3
          }}>
        <div className="flex flex-col items-center justify-center w-auto h-auto mt-[40px] md:mt-[80px]">

          <div className="text-[32px] md:text-[48px] font-[Ubuntu] font-[500] text-[#505D90] leading-[38.4px] md:leading-[57.6px]">
            <h2>🐾</h2>
          </div>
          <div className="text-[32px] md:text-[48px] font-[Ubuntu] font-[600] text-[#505D90] leading-[38.4px] md:leading-[57.6px] line-height-[38.4px] md:line-height-[57.6px] tracking-[-1.28px] md:tracking-[-1.92px]">
            <h2>One step away!</h2>
          </div>
          <div className="mt-[20px] text-center max-w-[320px] md:max-w-none text-[16px] font-[Inter] font-[400] text-[#101828] leading-[19px]">
            <h2>Uncover your pet's secret personality by entering your email! 🥰</h2>
          </div>
          <div className="relative w-full flex flex-col items-center justify-center">
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
            value={email}
            onChange={handleEmailChange}
            onBlur={() => setEmailValid(validateEmail(email) || email === '')}
            required
          />

          {/* {checking && (
                  <div className="mt-2 text-gray-500 text-sm font-[Inter] flex items-center">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Checking email availability...
                  </div>
          )} */}

          {/* {!isEmailAvailable && hasChecked && !isChecking && (
                  <div className="mt-2 text-yellow-600 text-sm font-[Inter]">
                      *Used email. Please try a new one or Sign up.
                  </div>
          )} */}

         {showEmailUsed && (
                <div className="absolute top-[92px] md:top-[72px] flex flex-row items-center justify-center gap-1 w-full text-[#E35C5C] text-[14px] font-[Inter]">
                      *Used email. Please try a new one or 
                      <span 
                        className="cursor-pointer underline hover:text-yellow-700 transition-colors"
                        onClick={() => 
                          {setShowSignup(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Sign up.
                      </span>
                </div>
          )}


          {showEmailRegistered && (
                <div className="absolute top-[92px] md:top-[72px] flex flex-row items-center justify-center gap-1 w-full text-[#E35C5C] text-[14px] font-[Inter]">
                      *Email is already registered. Please
                      <span 
                        className="cursor-pointer underline hover:text-yellow-700 transition-colors"
                        onClick={() => 
                          {setShowLogin(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Log in.
                      </span>
                </div>
          )}


          {showInvalidEmail && (
            <div className="absolute top-[92px] md:top-[72px] flex items-center justify-center w-full text-[#E35C5C] text-[14px] font-[Inter]">
              *Invalid email. Please enter a valid email address.
            </div>
          )}

          {showBlankEmail && (
            <div className="absolute top-[92px] md:top-[72px] flex items-center justify-center w-full text-[#E35C5C] text-[14px] font-[Inter]">
              *Please enter a valid email address.
            </div>
          )}

          </div>

          <div className="mt-[40px] text-[16px] font-[Inter] font-[400] text-[#717680] leading-[19.2px] line-height-[19.2px] w-[306px] flex flex-row items-start gap-2">
            <span>•</span>
            <h2>A copy of test result will be sent to your email</h2>
          </div>
          

          <button className="absolute md:static bottom-[48px] md:bottom-none mt-[48px] w-[145px] h-[44px] rounded-[22px] bg-[#5777D0] flex items-center justify-center"
          onClick={validateAndSubmit}>
            <h2 className="text-[16px] font-[Inter] font-[600] text-white">Get Result</h2>
          </button>
          
          {/* destop version */}
          <div className="hidden md:flex text-center mt-[20px] max-w-[468px] w-full text-[14px] font-[Inter] font-[400] text-[#717680] leading-[16px] line-height-[22.4px] flex flex-col items-center">
            *Each email address can access the test result only once. 
            <div className="flex flex-row items-start gap-1">
            Want deeper insights and unlimited tests? 
            <span 
                        className="flex flex-row cursor-pointer underline hover:text-[#5777D0] transition-colors"
                        onClick={() => 
                          {setShowSignup(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Sign up
            </span>
            or
            <span 
                        className="flex flex-row cursor-pointer underline hover:text-[#5777D0] transition-colors"
                        onClick={() => 
                          {setShowLogin(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Log in
            </span>
            now.
            </div>
          </div>

          {/* mobile version */}
          <div className="md:hidden absolute bottom-[124px] max-w-[242px] text-center w-full text-[14px] font-[Inter] font-[400] text-[#717680] leading-[16px] line-height-[16.8px] flex flex-col items-center">
            *Each email address can access the<br />
            test result only once. 
            <br />
            Want deeper insights and unlimited  
            <div className="flex flex-row items-start gap-1">
            tests? 
            <span 
                        className="flex flex-row cursor-pointer underline hover:text-[#5777D0] transition-colors"
                        onClick={() => 
                          {setShowSignup(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Sign up
            </span>
            or
            <span 
                        className="flex flex-row cursor-pointer underline hover:text-[#5777D0] transition-colors"
                        onClick={() => 
                          {setShowLogin(true);
                          setShowEmail(false);
                        }
                        }
                        > 
                        Log in
            </span>
            now.
            </div>
          </div>
          </div>

      </motion.div>
    </motion.div>
);
}