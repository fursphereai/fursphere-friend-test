"use client";

import ProgressBar from '../components/mbti/ProgressBar';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import StartScreen from '../components/mbti/part1/StartScreen'
import StartScreen2 from '../components/mbti/part1/StartScreen2';
import StartScreen3 from '../components/mbti/part1/StartScreen3';
import Page1 from '../components/mbti/part1/page1';
import Page2 from '../components/mbti/part1/page2'
import Page3 from '../components/mbti/part1/page3';
import Page4 from '../components/mbti/part1/page4';
import Page5 from '../components/mbti/part1/page5';
import Page6 from '../components/mbti/part2/page6';
import Page7 from '../components/mbti/part2/page7';
import Page8 from '../components/mbti/part2/page8';
import Page9 from '../components/mbti/part2/page9';
import Page10 from '../components/mbti/part2/page10'; 
import Page11 from '../components/mbti/part2/page11';
import Page12 from '../components/mbti/part2/page12';
import Page13 from '../components/mbti/part2/page13';
import Page14 from '../components/mbti/part2/page14';
import Page15 from '../components/mbti/part2/page15';
import Page16 from '../components/mbti/part2/page16';
import Page17 from '../components/mbti/part2/page17';
import Page18 from '../components/mbti/part2/page18';
import Page19 from '../components/mbti/part2/page19';
import MbtiResult from '../components/mbti/backup/backupfiles-jason/result/MbtiResult';
import SubmitResult from '../components/AI-Result/result';



import { motion, AnimatePresence } from 'framer-motion';







import EmailVerificationScreen from '../components/mbti/backup/backupfiles-jason/email/EmailVerificationScreen'

import StartPawfectMatch from '../components/mbti/backup/backupfiles-jason/match/StartPawfectMatch';
import PawfectMatch from '../components/mbti/backup/backupfiles-jason/match/PawfectMatch';
import PawfectMatchResult from '../components/mbti/backup/backupfiles-jason/match/PawfectMatchResult';

import {useLoggin} from '../context/LogginContext'



const PetMBTIFlow = () => {

  const { loggin, setLoggin } = useLoggin();
  const initialStep = 0; 
  const [step, setStep] = useState(initialStep);

  // 从 localStorage
    // const savedStep = localStorage.getItem('currentStep');
    // return savedStep ? parseInt(savedStep, 10) : initialStep;

  useEffect(() => {
    console.log("loggin test" + loggin);

    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.step !== undefined) {
        setStep(event.state.step);
      } else {
        setStep((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // step 改变时，更新 URL 和 localStorage
    window.history.replaceState({ step }, '', `?step=${step}`);
    localStorage.setItem('currentStep', step.toString());
  }, [step]);



  type SurveyData = {
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
  };

  const [surveyData, setSurveyData] = useState<SurveyData>({
    user_info: {
      name: '',
      email: '',
      ip: '',
      mbti: ''
    },
    pet_info: {
      PetSpecies: '',
      PetBreed: '',
      PetGender: '',
      PetSex: '',
      PetAge: '',
      PetName: '',
      PetPhoto: ''
    },
    personality_and_behavior: {
      Energy_Socialization: {
        seek_attention: '',
        interact_with_toys: '',
        stranger_enter_territory: '',
      },
      Routin_Curiosity: {
        prefer_routine: '',
        friend_visit_behaviors: '',
        fur_care_7days: '',
      },
      Decision_Making: {
        react_when_sad: '',
        toy_out_of_reach: '',
        react_new_friend: '',
      },
      Structure_Spontaneity: {
        react_new_environment: '',
        respond_to_scold: '',
        follow_commands: '',
      }
    }
  });


  const updateAnswer = <
  T extends keyof typeof surveyData,
  K extends keyof typeof surveyData[T]
    >(
      category: T,
      subCategory: K | null,
      field: keyof typeof surveyData[T] | string,
      value: string
    ) => {
      setSurveyData(prev => ({
        ...prev,
        [category]: subCategory
          ? {
              ...prev[category],
              [subCategory]: {
                ...prev[category][subCategory as keyof typeof surveyData[T]],
                [field]: value
              }
            }
          : {
              ...prev[category],
              [field]: value
            }
      }));
      console.log(surveyData);
};

const handleNext = () => {
  const nextStep = step + 1;
  window.history.pushState({ step: nextStep }, '', `?step=${nextStep}`);
  setStep(nextStep);
};
const handleSkip = () => {
  const nextStep = step + 1;
  window.history.pushState({ step: nextStep }, '', `?step=${nextStep}`);
  setStep(nextStep);
};

const handleBack = () => {
  const lastStep = step - 1;
  window.history.pushState({ step: lastStep }, '', `?step=${lastStep}`);
  setStep(lastStep);
};


const handleNext2 = () => {
  
  setStep(7);
};
const handleNext3 = () => {
  
  setStep(8);
};
  
  return (
    
    <div className="w-full min-h-screen flex flex-col">
    <div className="hidden md:flex">
      <Header/>
    </div>
      <ProgressBar step={step}/>
      <AnimatePresence mode="wait">
      {/* {step === 0 &&  <Page19 handleNext={handleNext} handleBack={handleBack}  step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>} */}
      {step === 0 && <StartScreen handleNext={handleNext} step={step} setStep={setStep} />}
      {/* {step === 0 &&  loggin === true && <StartScreen2 handleNext2={handleNext2} handleNext3={handleNext3}  step={step} setStep={setStep} />} */}
      {/* {step === 0 && <StartScreen3 handleNext={handleNext} step={step} setStep={setStep} />} */}
      {step === 1 && 
      <motion.div
        key="page2" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page1 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep} surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      } 
      {step === 2 && 
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page2 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep} surveyData={surveyData} updateAnswer={updateAnswer}/>
      </motion.div>
      } 
      {step === 3 && 
      <motion.div
        key="page3" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page3 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep} surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      } 
      {step === 4 && 
      <motion.div
        key="page4" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page4 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep} surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      } 
      {step === 5 && 
      <motion.div
        key="page5" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page5 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      } 
      {step === 6 && 
      <motion.div
        key="page6" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page6 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      } 
      {step === 7 && 
      <motion.div
        key="page7" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page7 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }
      {step === 8 && 
      <motion.div
        key="page8" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page8 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }
      {step === 9 && 
      <motion.div
        key="page9" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page9 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }
      {step === 10 && 
      <motion.div
        key="page10" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page10 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }
      {step === 11 && 
      <motion.div
        key="page11" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page11 handleNext={handleNext} handleBack={handleBack} handleSkip={handleSkip} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }
      {step === 12 && 
      <motion.div
        key="page12" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page12 handleNext={handleNext} handleBack={handleBack} handleSkip={handleSkip} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }
      {step === 13 && 
      <motion.div
        key="page13" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page13 handleNext={handleNext} handleBack={handleBack} handleSkip={handleSkip} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }
      {step === 14 && 
      <motion.div
        key="page14" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page14 handleNext={handleNext} handleBack={handleBack} handleSkip={handleSkip} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }
      {step === 15 && 
      <motion.div
        key="page15" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page15 handleNext={handleNext} handleBack={handleBack} handleSkip={handleSkip} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }
      {step === 16 && 
      <motion.div
        key="page16" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page16 handleNext={handleNext} handleBack={handleBack} handleSkip={handleSkip} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }
      {step === 17 && 
      <motion.div
        key="page17" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page17 handleNext={handleNext} handleBack={handleBack} handleSkip={handleSkip} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }
      {step === 18 && 
      <motion.div
        key="page18" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page18 handleNext={handleNext} handleBack={handleBack} handleSkip={handleSkip} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>
      }

      {step === 19 && 
      <motion.div
        key="page19" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Page19 handleNext={handleNext} handleBack={handleBack}  step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>
      </motion.div>

      /* {step === 6 && <EmailVerificationScreen handleNext={handleNext} step={step} setStep={setStep} surveyData = {surveyData} updateAnswer = {updateAnswer}/>}
      {step === 7 && <MbtiResult handleNext={handleNext}  step={step}setStep={setStep} surveyData = {surveyData} updateAnswer = {updateAnswer}/>}
      {step === 8 && <StartPawfectMatch handleNext={handleNext} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>}
      {step === 9 && <PawfectMatch handleNext={handleNext} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer}/>}
      {step === 10 && <PawfectMatchResult  handleNext={handleNext} step={step} setStep={setStep} surveyData = {surveyData} updateAnswer = {updateAnswer}/>} */}
      {/* {step === 'test' && <TestScreen onComplete={() => {
        setMbtiResult('ESFP');
        setStep('result');
      }} />}
      {step === 'result' && <ResultScreen mbtiResult={mbtiResult} email={email} setEmail={setEmail} isRegistered={isRegistered} setIsRegistered={setIsRegistered} onNext={() => setStep('pawfectMatch')} />}
      {step === 'pawfectMatch' && <PawfectMatchScreen />} */}
      {/* <MbtiResult handleNext={handleNext}  step={step}setStep={setStep} surveyData = {surveyData} updateAnswer = {updateAnswer}/> */}
      </AnimatePresence>
      <SubmitResult surveyData={surveyData}/>
    </div>

  );
};

export default PetMBTIFlow;
