'use client'; 
import React, { useEffect, useState } from 'react';
import Loggin from '../loggin_signup/loggin';
import Signup from '../loggin_signup/signup';
import Email from '../loggin_signup/email';
import { handleSubmit } from '../submit_result';
import { saveResult } from '../surveyService';

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


interface Question13Props {
    handleNext: () => void; 
    handleBack: () => void;
    surveyData: SurveyData;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    updateAnswer: (category: keyof SurveyData, subCategory: any, field: string, value: string | File) => void;
    aiResult: any;
    setAiResult: React.Dispatch<React.SetStateAction<any>>;
    setResult1: React.Dispatch<React.SetStateAction<boolean>>;
}

const Question13: React.FC<Question13Props>  = ({ handleNext, handleBack, step, setStep, surveyData, updateAnswer, aiResult, setAiResult, setResult1}) => {
  
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [showComment, setShowComment] = useState(false);


  const [isEmailValid, setIsEmailValid] = useState(true);

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false); 


  const images = [
    '/test1.svg',
    '/test2.svg',
  ];

  const handleNextClick = async() => {
    if (surveyData.user_info.email) {
      handleSubmit();
      setShowComment(true); 
    } else {
      return;
    }
 
  };

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);


  const handleSubmit = async () => {
    try {
      // Debug log
      console.log('Submitting data...')
  
      const data = {
        surveyData
      }
  
      console.log('Data to submit:', data)
      const result = await saveResult(data)
      console.log('Save result:', result)
  
    } catch (error: any) {
      console.error('Submit error:', error.message)
    }
  }

  return (

    <div className=" relative w-full mx-auto h-[calc(100svh-96px)] md:h-[calc(100vh-140px)] max-h-[1440px]">

    {showComment && (
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold">Thank you</h1>
        </div>
      </div>
    )}

    {showEmail && (
      <Email 
        setStep={setStep} 
        handleNext={handleNext} 
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
        setShowEmail={setShowEmail}
        surveyData={surveyData}
        aiResult={aiResult}
        setAiResult={setAiResult}
        setResult1={setResult1}
      />
    )}

  

   
       
      <div className=" flex flex-col w-[320px] md:w-[540px] mx-auto ">
        <label
          className= {`
            mt-[40px] md:mt-[85px]
            text-[16px] md:text-[18px]
            font-[Inter]
            font-[400]
            ml-[10px]
            text-[#101828]
            text-center`}
        >
          Please leave your email for us to better in touch with you!
        </label>
        <input
          type="text"
          placeholder="email"
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
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            updateAnswer('user_info', 'email', 'email', e.target.value);
            
          }}
        />

      </div>

     <div className="  mx-auto w-[320px] md:w-[540px] absolute max-md:bottom-[48px] md:top-[393px] left-0 right-0 flex justify-center">
              {/* <button 
                className="w-[44px] h-[44px] rounded-[22px] bg-[#D1D7EF] flex items-center justify-center md:w-[132px] md:p-0"
                onClick={handleBack}
              >
                <span className="hidden md:inline text-white">Previous</span>
                <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
                </svg>
              </button> */}

              <button 
                className={`w-[124px] h-[44px] rounded-[22px] flex text-white items-center justify-center md:w-[101px] md:p-0 ${surveyData.user_info.email ? 'bg-[#5777D0]' : 'bg-[#717680]'}`}
                onClick={handleNextClick}
              >
        
               finish
              </button>

            </div>
      </div>
  );
};

export default Question13;
