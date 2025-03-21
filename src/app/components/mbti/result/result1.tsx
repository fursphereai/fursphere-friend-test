'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { SurveyData } from '@/app/types/survey';
import { generateDownload } from '../downloads/downloadpage1';
import DownloadPage1 from '../downloads/downloadpage1';



interface Result1Props {
  handleNext: () => void;
  handleBack: () => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  surveyData: surveyData;
  updateAnswer: (category: keyof SurveyData, subCategory: any, field: string, value: string) => void;
  setResult1: (result: boolean) => void;
  setResult2: (result: boolean) => void;
  setResult3: (result: boolean) => void;
  aiResult: any;
}

const Result1: React.FC<Result1Props> = ({ handleNext, handleBack, step, setStep, surveyData, updateAnswer, setResult1, setResult2, setResult3,  aiResult}) => {


  const handleNextClick = () => {
    setResult1(false);
    setResult2(true);
   
  };

  return (
    <div className="relative mt-[100px] w-full mx-auto h-[993px] flex flex-col items-center bg-white">
      {/* 🔹 进度条部分（顶部 80px 间距） */}

      <div className="mt-0 h-[40px] md:h-[70px] bg-[#EEF1FA] w-full">

        <div className="relative flex flex-row items-center justify-center max-w-[1440px] h-full mx-auto px-[10px]">
          <button className="inline max-[1056px]:hidden absolute left-1/2 -translate-x-[606.5px] max-[1254px]:-translate-x-[506.5px] text-[#C3C3C3] text-[14px]">
            Exit
          </button>
          <p className=" hidden md:flex text-[#27355D] text-[14px]">Result</p>

          <div className=" flex flex-row justify-between bg-[#EEF1FA] mx-[20px] md:mx-[24px] w-full max-w-[276px] md:max-w-[740px] h-[10px] rounded-[8px]"> 
            <div className="w-[84px] md:w-[230px] ml-[0px] h-full bg-[#5777D0] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
            <div className="w-[84px] md:w-[230px] ml-[0px] h-full bg-[#D1D7EF] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
            <div className="w-[84px] md:w-[230px] ml-[0px] h-full bg-[#D1D7EF] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
          </div>

          <p className="text-[#27355D] text-[14px] font-[600]">1/3</p>
        </div>

      </div>

      {/* 🔹 主要内容容器（80px 间距，540px 宽） */}
      <div className="relative  bg-yellow-300 w-[320px] md:w-[540px] h-[528px] md:h-[600px] mt-[30px] md:mt-[80px] flex flex-col items-center">
        {/* Name 标题 */}
        
       <h1 className=" text-[14px] md:text-[20px] text-[#27355D] font-[400] md:font-[610] font-Inter w-full text-left leading-[1.2] ">Name</h1>
        <h1 className=" text-[20px] md:text-[36px] text-[#000] font-[600] md:font-[710] font-Inter w-full text-left leading-[1.2] ">Mingming</h1>

        {/* MBTI 结果卡片 */}
        <div className="relative flex items-center bg-[#4B367B] text-white rounded-[20px] md:rounded-[40px] mt-[11.74px] md:mt-[20px] w-full h-[100px] md:h-[167px]">
          <div>
            <h3 className=" ml-[17.78px] md:ml-[30px] text-[56px] md:text-[96px] font-[710] font-Inter leading-none">INTP</h3>
            <p className=" ml-[17.78px] md:ml-[30px] text-[12px] md:text-[20px] font-[710] font-Inter">The Logician</p>
          </div>
          {/* 预留 MBTI 右侧插图（顶部溢出紫色框） */}
          <div className="absolute bottom-[0px] right-[0px] w-[150px] md:w-[260px] h-[150px] md:h-[260px]">
            <img src="/dog-INTP.svg" alt="mbti-result" className="w-full h-full object-cover" />
          </div>
        </div>
        {/* 宠物个性描述 */}

        <div className="flex flex-row 
        mt-[40px] md:mt-[36px] 
        bg-blue-300 
        text-left text-[#000] 
        font-Inter font-[400] text-[20px] leading-[1.2] 
        w-full">
          
          <div className="md:hidden w-[100px] h-[100px] border-[2px] border-[#4B367B] rounded-[20px] flex items-center justify-center mr-[10px]">
            <img src="/mingming.svg" alt="Mingming" className="w-full h-full rounded-[20px] object-cover" />
          </div>
          <p className = "w-[210px] md:w-full bg-red-300">
            "I know the laser isn’t real, but if it amuses the humans, I’ll play along... for now." 😼✨
          </p>
        </div>

        {/* 宠物照片 & 结论 */}
        <div className="bg-green-300 flex flex-row items-center gap-[20px] mt-[40px] md:mt-[20px] w-full">
          <div className="hidden md:flex w-[232px] h-[232px] border-[4px] border-[#4B367B] rounded-[40px] flex items-center justify-center">
            <img src="/mingming.svg" alt="Mingming" className="w-full h-full rounded-[40px] object-cover" />
          </div>

          {/* 右侧结论部分 */}
          <div className="flex flex-col w-[288px] mt-[0] md:mt-[30px]">
            <h3 className="font-[600] text-[20px] text-[#27355D] font-Inter leading-[1.2] tracking-[0%]">Conclusion</h3>
            <p className=" w-[320px] md:w-[288px] bg-red-300 text-[16px] text-[#1C1C1C] font-[400] font-Inter leading-[1.2] mt-[20px] md:mt-[10px] tracking-[0%]">
              Mingming is a quiet observer, thoughtful and independent. He prefers to explore at his own pace, engaging only when it truly interests him. 
              While not overly affectionate, his loyalty runs deep. Understanding Mingming means respecting his space and stimulating his sharp mind with curiosity and challenge.
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 按钮区域 */}
      <div className="bg-green-300 flex flex-row justify-between w-full max-w-[320px] md:max-w-[540px] mt-[34px] md:mt-[40px]">
        <button className="flex flex-row items-center justify-center w-[44px] md:w-[132px] h-[44px] bg-[#D1D7EF] rounded-[22px] text-[16px] font-[600] text-white">
               <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
               <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
               </svg>
          <span className="hidden md:flex">Previous</span>
        </button>

        <button className=" w-[205px] h-[44px] bg-white rounded-[22px] border-[1px] border-[#C3C3C3] text-[16px] font-[600] text-black"
         onClick={generateDownload}>
          Download & Share
        </button>
        <button className="flex flex-row items-center justify-center w-[44px] md:w-[101px] h-[44px] bg-[#5777D0] rounded-[22px] text-[16px] font-[600] text-white" onClick={handleNextClick}>
              <svg className="md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" fill="white"/>
              </svg>
          <span className="hidden md:flex">Next</span>
        </button>
      </div>


      {/* 🔹 Logo */}
      <div className="hidden md:flex w-full flex justify-center mt-[70px]">
        <p className="text-[#000] opacity-[0.5] flex items-center gap-[10px]">
         Powered by 
         <img src="/fursphere-bottom-logo.svg" alt="FurSphere Logo" className="w-[199px]" />
       </p>
      </div>
      {/* <div className="">
        <DownloadPage1 />
      </div> */}
    </div>


  );
};

export default Result1;