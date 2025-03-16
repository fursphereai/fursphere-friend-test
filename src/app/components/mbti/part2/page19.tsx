'use client'; 
import React, { useEffect, useState } from 'react';
import ImageUpload from '../ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';
import Loggin from './loggin';

interface SurveyData {
  user_info: {
    name: string,
    email: string,
    ip: string;
    mbti: string
  };
  pet_info: {
    PetSpecies: string;
    PetBreed: string,
    PetGender: string,
    PetSex: string,
    PetAge: string,
    PetName: string,
    PetPhoto: string,
  };
  personality_and_behavior: {
      Energy_Socialization: {
          seek_attention: string,
          interact_with_toys: string,
          stranger_enter_territory: string,
      },
      Routin_Curiosity: {
          prefer_routine: string,
          friend_visit_behaviors: string,
          fur_care_7days: string,
      },
      Decision_Making: {
          react_when_sad: string,
          toy_out_of_reach: string,
          react_new_friend: string, 
      },
      Structure_Spontaneity: {
          react_new_environment:string,
          respond_to_scold:string,
          follow_commands:string,
      };
  };
}


interface BasicInfoScreenProps {
    handleNext: () => void; 
    handleBack: () => void;
    surveyData: SurveyData;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    updateAnswer: (category: keyof SurveyData, subCategory: any, field: string, value: string | File) => void;
}

const Page19: React.FC<BasicInfoScreenProps>  = ({ handleNext, handleBack, step, setStep, surveyData, updateAnswer  }) => {
  
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const [isEmailValid, setIsEmailValid] = useState(true);

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false); 

  const validateEmail = (email: string) => {
    if (!email) return true; // Return true for empty input
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
};

const checkEmailAvailability = async (email: string) => {
  try {
    if (email === 'likey6688@gmail.com' || email === '1173830105@qq.com') {
      setIsChecking(true);
      setIsEmailAvailable(true);
    } else {
      setIsChecking(true);
      // const response = await fetch('/api/check-email', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ email })
      // });
      // const data = await response.json();
      // setIsEmailAvailable(data.available);
      console.log("isChecking" + isChecking);
      console.log("email" + email);
      setIsEmailAvailable(false);
      console.log("isEmailAvailable" + isEmailAvailable);
    }
  } catch (error) {
      console.error('Error checking email:', error);
  } finally {
      setIsChecking(false);
      console.log("isChecking" + isChecking);
  }
};


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  

    if ( validateEmail(newEmail) && newEmail !== '') {
      console.log("hasChecked" + hasChecked);
      console.log("newEmail" + newEmail);
      checkEmailAvailability(newEmail);
      // setIsEmailAvailable(true);

  } 
  };

  const images = [
    '/test1.svg',
    '/test2.svg',
  ];

  const handleNextClick = () => {
    setShowLogin(true);
    // setShowSignup(true);
  };

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };


const [isSendingCode, setIsSendingCode] = useState(false);
const [isCodeSent, setIsCodeSent] = useState(false);
const [verificationCode, setVerificationCode] = useState('');
const [userInputCode, setUserInputCode] = useState('');

  const sendVerificationCode = async () => {
    if (!email || !isEmailValid) return;
    
    setIsSendingCode(true);
    try {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setVerificationCode(code);

        const response = await fetch('/api/proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'send_verification',
                email,
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
        setIsSendingCode(false);
    }
};


const [error, setError] = useState<string>('');
const [isValidated, setIsValidated] = useState(false);
const [isValidating, setIsValidating] = useState(false);

// Validation function
const validateAndSubmit = async () => {
  setShowSignup(false);
  setShowLogin(true);
  console.log("userInputCode" + userInputCode);
  console.log("verificationCode" + verificationCode);
  console.log("email" + email);
  // Check if email exists and is valid
  if (!email || !isEmailValid) {
      setError('Please enter a valid email address');
      return;
  }

  // Check if verification code was sent
  if (!isCodeSent) {
      setError('Please request and enter verification code');
      return;
  }

  // Check if verification code matches
  if (!userInputCode || userInputCode !== verificationCode) {
      setError('Invalid verification code');
      return;
  }

  try {
    console.log("userInputCodetesting" + userInputCode);
      setIsValidating(true);
      // Here you can add your API call to submit the result
      setIsValidated(true);
      
      // Proceed with your result submission logic
      console.log('Validation successful');
  } catch (error) {
      setError('Failed to validate. Please try again.');
  } finally {
      setIsValidating(false);
  }
};



  return (

    <div className=" relative w-full mx-auto h-[calc(100vh-40px)] md:h-[calc(100vh-140px)] max-h-[1440px]">

    {showEmail && (
        <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4}}
      >
          <div className="bg-white w-[768px] h-[563px] rounded-[22px]">
            <div className="flex flex-col items-center justify-center w-auto h-auto mt-[80px]">

              <div className="text-[48px] font-[Ubuntu] font-[500] text-[#505D90] leading-[57.6px]">
                <h2>🐾</h2>
              </div>
              <div className="text-[48px] font-[Ubuntu] font-[600] text-[#505D90] bg-red-500 leading-[57.6px] line-height-[57.6px] tracking-[-1.92px]">
                <h2>One step away!</h2>
              </div>
              <div className="mt-[20px] bg-red-500 text-[16px] font-[Inter] font-[400] text-[#101828] leading-[19px]">
                <h2>Uncover your pet's secret personality by entering your email! 🥰</h2>
              </div>
              <div className="relative bg-yellow-500 w-full flex flex-col items-center justify-center">
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
                  ${!isEmailValid && email !== '' 
                    ? 'border-red-500' 
                    : email && isEmailValid 
                      ? 'border-green-500' 
                      : 'border-[#717680]'}
                  `}
                value={email}
                onChange={handleEmailChange}
                onBlur={() => setIsEmailValid(validateEmail(email) || email === '')}
                required
              />

              {isChecking && (
                      <div className="mt-2 text-gray-500 text-sm font-[Inter] flex items-center">
                          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Checking email availability...
                      </div>
              )}

              {/* {!isEmailAvailable && hasChecked && !isChecking && (
                      <div className="mt-2 text-yellow-600 text-sm font-[Inter]">
                          *Used email. Please try a new one or Sign up.
                      </div>
              )} */}

              {(() => {
                  const shouldShowError = !isEmailAvailable && !isChecking && isEmailValid && email !== '';
                  console.log('Email Status:', {
                      isEmailAvailable,
                      isChecking,
                      shouldShowError
                  });
                  
                  return shouldShowError && (
                    <div className="absolute top-[72px] flex flex-row items-center justify-center gap-1 w-full text-[#E35C5C] text-[14px] font-[Inter]">
                          *Used email. Please try a new one or 
                          <span 
                            className="cursor-pointer underline hover:text-yellow-700 transition-colors"
                            onClick={() => 
                              {setShowSignup(true);
                              setShowEmail(false);
                            }
                            }
                            > 
                            Sign up
                          </span>
                    </div>
                  );
              })()}


              {!isEmailValid && email !== '' && (
                <div className="absolute top-[72px] flex items-center justify-center w-full text-[#E35C5C] text-[14px] font-[Inter]">
                  *Invalid email. Please enter a valid email address.
                </div>
              )}

              </div>

              <div className="mt-[40px] text-[16px] font-[Inter] font-[400] text-[#717680] leading-[19.2px] line-height-[19.2px] w-[306px] flex flex-row items-start gap-2">
                <span>•</span>
                <h2>A copy of test result will be sent to your email</h2>
              </div>
             
                <button className="mt-[48px] w-[145px] h-[44px] rounded-[22px] bg-[#5777D0] flex items-center justify-center">
                  <h2 className="text-[16px] font-[Inter] font-[600] text-white">Get Result</h2>
                </button>

              <div className="text-center mt-[20px] bg-red-500 max-w-[468px] w-full text-[14px] font-[Inter] font-[400] text-[#717680] leading-[16px] line-height-[22.4px] flex flex-row items-start gap-2">
                <h2>*Each email address can access the test result only once. 
                Want deeper insights and unlimited tests? Sign up ro Log in now.</h2>
              </div>
                
                
            </div>
          
           
          
          </div>
        </motion.div>
      )}




{showSignup && (
        <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1}}
      >
          <div className="bg-white w-[768px] h-[633px] rounded-[22px]">
            <div className="flex flex-col items-center justify-center w-auto h-auto mt-[80px]">

              <div className="text-[48px] bg-yellow-500 font-[Ubuntu] font-[500] text-[#505D90] leading-[48px]">
                <h2>🐾</h2>
              </div>
              <div className="text-[48px] font-[Ubuntu] font-[600] text-[#505D90] bg-red-500 leading-[48px] line-height-[57.6px] tracking-[-1.92px]">
                <h2>Sign up & get result!</h2>
              </div>
                <div className="mt-[20px] bg-red-500 text-[16px] font-[Inter] font-[400] text-[#101828] leading-[16px]">
                  <h2>Register in just 60 seconds and unlock all following benefits! 🥰</h2>
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
                  ${!isEmailValid && email !== '' 
                    ? 'border-red-500' 
                    : email && isEmailValid 
                      ? 'border-green-500' 
                      : 'border-[#717680]'}
                  `}
                value={email}
                onChange={handleEmailChange}
                onBlur={() => setIsEmailValid(validateEmail(email) || email === '')}
                required
              />

              <button className= {`mt-[20px] w-[149px] h-[44px] rounded-[22px] 
                ${isSendingCode ? 'bg-gray-400' : 'bg-[#5777D0]'} 
                flex items-center justify-center 
                text-[16px] font-[Inter] font-[600] text-white
                `}
                onClick={sendVerificationCode}
                disabled={isSendingCode || !isEmailValid || !email}
              >
                {isSendingCode ? 'Sending...' : 'Send Code'}
              </button>

              {isChecking && (
                      <div className="mt-2 text-gray-500 text-sm font-[Inter] flex items-center">
                          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Checking email availability...
                      </div>
              )}

              {/* {!isEmailAvailable && hasChecked && !isChecking && (
                      <div className="mt-2 text-yellow-600 text-sm font-[Inter]">
                          *Used email. Please try a new one or Sign up.
                      </div>
              )} */}

              {(() => {
                  const shouldShowError = !isEmailAvailable && !isChecking && isEmailValid && email !== '';
                  console.log('Email Status:', {
                      isEmailAvailable,
                      isChecking,
                      shouldShowError
                  });
                  
                  return shouldShowError && (
                    <div className="absolute top-[72px] flex flex-row items-center justify-center gap-1 w-full text-[#E35C5C] text-[14px] font-[Inter]">
                          *Used email. Please try a new one or 
                          <span 
                            className="cursor-pointer underline hover:text-yellow-700 transition-colors"
                            onClick={() => 
                              {setShowSignup(true);
                              setShowEmail(false);
                            }
                            }
                            > 
                            Sign up
                          </span>
                    </div>
                  );
              })()}


              {!isEmailValid && email !== '' && (
                <div className="absolute top-[73px] left-[150px] w-full text-[#E35C5C] text-[14px] font-[Inter] leading-[14px]">
                  *Invalid email. Please enter a valid email address
                </div>
              )}

              </div>

              <div className = "flex flex-col bg-yellow-500 items-start justify-center">
              <input
                type="text"
                placeholder="Enter 6-digit code"
                className= {`
                  w-[467px] 
                  h-[44px]
                  mt-[45px]
                  py-[12px] pl-[12px] 
                  border border-[1px] 
                  rounded-[22px]
                  bg-white
                  font-[Inter]
                  text-[16px] text-[#27355D] font-[400]
                  focus:outline-none
                  placeholder:[#C3C3C3] 
                  placeholder:text-[16px] 
                  ${error ? 'border-red-500' : 'border-[#717680]'}
                  `}
                  value={userInputCode}
                  onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length <= 6) {
                          setUserInputCode(value);
                          setError('');
                      }
                  }}
                  maxLength={6}
              />

              <div className="mt-[40px] text-[16px] font-[Inter] font-[400] text-[#717680] leading-[16px] line-height-[16px] w-[284px] flex flex-col items-start gap-[10px]">
                <h2>• Test result with exclusive insights</h2>
                <h2>• Unlimited tests</h2>
                <h2>• Tests history save to your account</h2>
                <h2>• Unlock Pawfect Match test</h2>
              </div>

              </div>
             
              <button className="mt-[40px] w-[145px] h-[44px] rounded-[22px] bg-[#5777D0] flex items-center justify-center"
              onClick={validateAndSubmit}
              disabled={isValidating || !email || !isEmailValid || !isCodeSent || !userInputCode}
              >
                <h2 className="text-[16px] font-[Inter] font-[600] text-white">
                {isValidating ? 'Validating...' : 'Get Result'}
                </h2>
              </button>

              {isValidated && (
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
          
           
          
          </div>
        </motion.div>
      )}

      {showLogin && (
        <Loggin />
      )}
       
      <div className=" flex flex-col w-[320px] md:w-[540px] mx-auto ">
        <label
          className= {`
            mt-[40px] md:mt-[85px]
            text-[16px] md:text-[18px]
            font-[Inter]
            font-[400]
            ml-[10px]`}
        >
          Anything else you want to tell us?
        </label>
        <input
          type="text"
          placeholder="Tell us more about your pet"
          className="
            w-[100%] 
            md:w-[540px] 
            md:h-[44px]
            mt-[20px]
            py-[12px] pl-[12px] pr-[130px]
            border border-[1px] border-[#717680]
            rounded-[22px]
            bg-white
            font-[Inter]
            text-[#27355D]
            focus:outline-none focus:border-[#FFC542]
            placeholder:[#C3C3C3] placeholder:text-[16px] md:placeholder:text-[18px]
          "
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

      </div>

     <div className="  mx-auto w-[320px] md:w-[540px] absolute max-md:bottom-[48px] md:top-[393px] left-0 right-0 flex justify-between">
              <button 
                className="w-[44px] h-[44px] rounded-[22px] bg-[#D1D7EF] flex items-center justify-center md:w-[132px] md:p-0"
                onClick={handleBack}
              >
                <span className="hidden md:inline text-white">Previous</span>
                <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
                </svg>
              </button>

              <button 
                className="w-[44px] h-[44px] rounded-[22px] flex items-center justify-center md:w-[101px] md:p-0 bg-[#5777D0]"
                onClick={handleNextClick}
              >
                <span className="hidden md:inline text-white">Next</span>
               <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" fill="white"/>
              </svg>
              </button>

            </div>
      </div>
  );
};

export default Page19;
