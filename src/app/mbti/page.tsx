"use client";

import ProgressBar from '../components/mbti/ProgressBar';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';

import StartScreen from '../components/mbti/basic_info/startscreen'
import Part1 from '../components/mbti/basic_info/part1';
import SpecieBreed from '../components/mbti/basic_info/specie_breed'
import Gender from '../components/mbti/basic_info/gender';
import Age from '../components/mbti/basic_info/age';
import NamePhoto from '../components/mbti/basic_info/name_photo';

import Part2 from '../components/mbti/behavioral_quiz/part2';


// import Question1 from '../components/mbti/behavioral_quiz/question1';
// import Question2 from '../components/mbti/behavioral_quiz/question2';
// import Question3 from '../components/mbti/behavioral_quiz/question3';
// import Question4 from '../components/mbti/behavioral_quiz/question4'; 
// import Question5 from '../components/mbti/behavioral_quiz/question5';
// import Question6 from '../components/mbti/behavioral_quiz/question6';
// import Question7 from '../components/mbti/behavioral_quiz/question7';
// import Question8 from '../components/mbti/behavioral_quiz/question8';
// import Question9 from '../components/mbti/behavioral_quiz/question9';
// import Question10 from '../components/mbti/behavioral_quiz/question10';
// import Question11 from '../components/mbti/behavioral_quiz/question11';
// import Question12 from '../components/mbti/behavioral_quiz/question12';
import Question13 from '../components/mbti/behavioral_quiz/question13';

import { motion, AnimatePresence } from 'framer-motion';




import {useLoggin} from '../context/LogginContext'
import DownloadPage1 from '../components/mbti/downloads/downloadpage1';



const PetMBTIFlow = () => {

  const { loggin, setLoggin } = useLoggin();
  const initialStep = 15; 
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
      PetBreedCustom: string,
      PetGender: string,
      PetSex: string;
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
      PetBreedCustom: '',
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
  value: string | File
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


const handleNextPart1 = () => {
  
  
};
const handleNextPart2 = () => {
  
  
};


const [part1, setPart1] = useState(true);
const [part2, setPart2] = useState(false) ;
const [result1, setResult1] = useState(false);
const [result2, setResult2] = useState(false);
const [result3, setResult3] = useState(false);

const [downloadPage1, setDownloadPage1] = useState(true);
const [downloadPage2, setDownloadPage2] = useState(false);
const [downloadPage3, setDownloadPage3] = useState(false);
const [downloadPage4, setDownloadPage4] = useState(false);
const [downloadPage5, setDownloadPage5] = useState(false);


const [aiResult, setAiResult] = useState(false);

const basicInfoPages = [
  {
    step: 1,
    key: "specieBreed",
    Component: SpecieBreed,
    props: {}
  },
  {
    step: 2,
    key: "gender",
    Component: Gender,
    props: {}
  },
  {
    step: 3,
    key: "age",
    Component: Age,
    props: {}
  },
  {
    step: 4,
    key: "namePhoto",
    Component: NamePhoto,
    props: {}
  }
];

  
return (
    <div className="w-full bg-red-500 h-[100svh]">
    <div className="hidden md:flex">
      <Header/>
    </div>
      {(part1 === false && part2 === false && step !== 0 && result1 === false && result2 === false && result3 === false) && <ProgressBar step={step}/>}
      <AnimatePresence mode="wait">
      {part1 && 
      <motion.div
        key="part1" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Part1 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep} surveyData = {surveyData} updateAnswer = {updateAnswer} setPart1={setPart1}/>
      </motion.div>
      } 

      {basicInfoPages.map(({ step: pageStep, key, Component, props }) => (
        (part1 === false && part2 === false && step === pageStep && (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Component
              handleNext={handleNext}
              handleBack={handleBack}
              step={step}
              setStep={setStep}
              surveyData={surveyData}
              updateAnswer={updateAnswer}
              setPart2={setPart2}
              {...props}
            />
          </motion.div>
        )
       )))}

      {part2 && 
      <motion.div
        key="part2" 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
      <Part2 handleNext={handleNext} handleBack={handleBack} step={step} setStep={setStep}  surveyData = {surveyData} updateAnswer = {updateAnswer} setPart2={setPart2}/>
      </motion.div>
      } 

      {[5,6,7,8,9,10,11,12,13,14,15,16,17].map((pageStep) => 
        (part1 === false && part2 === false && result1 === false && result2 === false && result3 === false && step === pageStep && (
          <motion.div
            key={`page${pageStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const PageComponent = require(`../components/mbti/behavioral_quiz/question${pageStep - 4}`).default;
              return <PageComponent 
                handleNext={handleNext} 
                handleBack={handleBack} 
                handleSkip={handleSkip}
                step={step} 
                setStep={setStep} 
                surveyData={surveyData} 
                updateAnswer={updateAnswer}
                aiResult = {aiResult}
                setAiResult = {setAiResult}
                setResult1 = {setResult1}
                setResult2 = {setResult2}
                setResult3 = {setResult3}
              />;
            })()}
          </motion.div>
        )
      ))}


      
      
        
        {/* <AnimatePresence mode="wait">
        {result1 && (
        <motion.div
          key="result1" 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <Result1 
            setResult1={setResult1} 
            setResult2={setResult2} 
            setResult3={setResult3}
            aiResult={aiResult}
          />
        </motion.div>
  
      )} */}
{/* 
       {result2 && (
     
        <motion.div
          key="result2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <Result2 
            setResult1={setResult1} 
            setResult2={setResult2} 
            setResult3={setResult3}
            aiResult={aiResult}
          /> 
        </motion.div>

      )} */}
{/*       
      {result3 && (
       
        <motion.div
          key="result3"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <Result3 
            setResult1={setResult1} 
            setResult2={setResult2} 
            setResult3={setResult3}
            aiResult={aiResult}
          />
        </motion.div>
        
      )}
      </AnimatePresence> */}


      {/* {downloadPage1 && (
        <DownloadPage1
          handleNext={handleNext}
          setStep={setStep}
          setDownloadPage1={setDownloadPage1}
          setDownloadPage2={setDownloadPage2}
          setDownloadPage3={setDownloadPage3}
          setDownloadPage4={setDownloadPage4}
          setDownloadPage5={setDownloadPage5}
          surveyData={surveyData}
          aiResult={aiResult}
          setAiResult={setAiResult}
        />
      )} */}
      


       {/* <Result3 /> */}
     
      </AnimatePresence>
      
    </div>

  );
};

export default PetMBTIFlow;
