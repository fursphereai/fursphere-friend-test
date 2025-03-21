'use client';
import React from 'react';
import { useRouter } from 'next/navigation';


interface Result2Props {
  setResult1: (result: boolean) => void;
  setResult2: (result: boolean) => void;
  setResult3: (result: boolean) => void;
  aiResult: any;
}

const Result2: React.FC<Result2Props> = ({ setResult1, setResult2, setResult3,  aiResult}) => {
  const router = useRouter();

  const handleNextClick = () => {
    setResult1(false);
    setResult2(false);
    setResult3(true);
  };

  const handlePreviousClick = () => {
    setResult1(true);
    setResult2(false);
    setResult3(false);
  };

  return (
    <div className="relative mt-[100px] bg-purple-300 w-full mx-auto h-[1275px] min-h-screen flex flex-col items-center ">
      {/* 🔹 进度条部分 */}
      <div className="mt-0 h-[40px] md:h-[70px] bg-[#EEF1FA] w-full">

        <div className="relative flex flex-row items-center justify-center max-w-[1440px] h-full mx-auto px-[10px]">
          <button className="inline max-[1056px]:hidden absolute left-1/2 -translate-x-[606.5px] max-[1254px]:-translate-x-[506.5px] text-[#C3C3C3] text-[14px]">
            Exit
          </button>
          <p className=" hidden md:flex text-[#27355D] text-[14px]">Result</p>

          <div className=" flex flex-row justify-between bg-[#EEF1FA] mx-[20px] md:mx-[24px] w-full max-w-[276px] md:max-w-[740px] h-[10px] rounded-[8px]"> 
            <div className="w-[84px] md:w-[230px] ml-[0px] h-full bg-[#D1D7EF] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
            <div className="w-[84px] md:w-[230px] ml-[0px] h-full bg-[#5777D0] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
            <div className="w-[84px] md:w-[230px] ml-[0px] h-full bg-[#D1D7EF] bg-[#5777D0] rounded-full transition-all duration-200 ease-in-out"></div>
          </div>

          <p className="text-[#27355D] text-[14px] font-[600]">2/3</p>
        </div>

      </div>


      {/* 🔹 主要内容容器（80px 间距，540px 宽） */}
      <div className="bg-red-300 relative w-[320px] md:w-[540px] h-[978px] md:h-[894px] mt-[30px] md:mt-[80px] flex flex-col items-center">
         {/* 🔹 顶部：MBTI 详情标题 + 结果卡片（左右排列） */}
         <div className="flex flex-row bg-blue-300 h-[42px] md:h-[84px] justify-between w-full">
          <div className="bg-green-300 flex flex-col">
            {/* MBTI 详情标题（左侧） */}
            <h1 className="text-[14px] md:text-[20px] text-[#27355D] font-[400] md:font-[600] font-Inter leading-[1.2]">MBTI Detail Breakdown</h1>
            {/* Mingming（在 MBTI 详情标题下方） */}
            <h2 className="text-[20px] md:text-[36px] text-[#000000] font-[600] md:font-[710] font-Inter leading-[1.2]">Mingming</h2>

          </div>
          {/* MBTI 结果框（右侧） */}
          <div className="flex items-center justify-center bg-[#4B367B] text-white rounded-[10px] md:rounded-[20px] w-[82px] md:w-[164px] h-[42px] md:h-[84px] ">
            <h3 className="text-[18px] md:text-[36px] font-[710] font-Inter leading-none">INTP</h3>
          </div>
        </div>

        {/* 🔹 MBTI 分析条 */}
        <div className="bg-purple-300 w-full mt-[40px] space-y-[10px]">
  {[
    { title: 'Mind', value: 53, color: 'bg-[#5777D0]', textColor: 'text-[#5777D0]' },
    { title: 'Energy', value: 53, color: 'bg-[#FFC542]', textColor: 'text-[#FFC542]' },
    { title: 'Nature', value: 63, color: 'bg-[#FFC542]', textColor: 'text-[#FFC542]' },
    { title: 'Tactics', value: 33, color: 'bg-[#5777D0]', textColor: 'text-[#5777D0]' },
  ].map((trait, index) => (
    <div key={index} className="w-full text-center">
      {/* 🔹 标题 */}
      <h3 className="text-[16px] md:text-[20px] font-[710] md:font-[600] font-Inter text-[#27355D] mb-[10px] leading-[1.2]">{trait.title}</h3>

      {/* 🔹 进度条 */}
      <div className="relative w-full bg-[#E5E7EB] h-[8px] md:h-[10px] rounded-[8px] md:rounded-[32px]">
              <div className={`${trait.color} h-[8px] md:h-[10px] rounded-[8px] md:rounded-[32px]`} style={{ width: `${trait.value}%` }}></div>
      </div>

      {/* 🔹 文字 */}
      <div className="flex justify-between text-[12px] md:text-[14px] font-Inter text-[#A1A1A1] mt-[4.74px] md:mt-[8px] leading-[1.2]">
        <span className={`text-left ${trait.textColor} whitespace-nowrap`}>
          <span className="font-[400]">Extraverted</span> <span className="font-[710]">[{trait.value}%]</span>
        </span>
        <span className="text-right text-[#5777D0] whitespace-nowrap">
        <span className="font-[710]">[{trait.value}%]</span> <span className="font-[400]">Extraverted</span> 
        </span>
      </div>
    </div>
  ))}
</div>

        {/* 🔹 MBTI 详细解释 */}
        <div className="bg-red-500 mt-[40px] w-full text-left text-[#000000] font-Inter space-y-[40px] md:space-y-[20px]">
          <div>
          <h3 className="text-Inter text-[#27355D] font-[600] text-[20px] leading-[1.2]">Introverted (I):</h3>
            <p className="mt-[10px] text-[16px] font-[400] leading-[1.2] text-[#1C1C1C] tracking-[-0.02em] md:tracking-normal">
              Your cat is very wary of strangers and prefers a familiar, quiet environment. This introverted nature indicates a preference for solitude or selective interactions.
            </p>
          </div>
          <div>
          <h3 className="text-Inter text-[#27355D] font-[600] text-[20px] leading-[1.2]">Intuitive (N):</h3>
            <p className="mt-[10px] text-[16px] font-[400] leading-[1.2] text-[#1C1C1C] tracking-[-0.02em] md:tracking-normal">
              Its rebellious and highly selective behavior suggests it operates on its own logic and unique "preferences." This points to a creative and unconventional thinker—always finding its way to break the rules.
            </p>
          </div>
          <div>
          <h3 className="text-Inter text-[#27355D] font-[600] text-[20px] leading-[1.2]">Thinking (T):</h3>
            <p className="mt-[10px] text-[16px] font-[400] leading-[1.2] text-[#1C1C1C] tracking-[-0.02em] md:tracking-normal">
              The cat’s behavior shows it prioritizes its own comfort and preferences over harmony. Its occasional aggression is a clear indicator of putting practicality (self-protection, personal boundaries) first.
            </p>
          </div>
          <div>
          <h3 className="text-Inter text-[#27355D] font-[600] text-[20px] leading-[1.2]">Perceiving (P):</h3>
            <p className="mt-[10px] text-[16px] font-[400] leading-[1.2] text-[#1C1C1C] tracking-[-0.02em] md:tracking-normal">
              The lack of adherence to routines, such as being messy or unpredictable, aligns with the flexible and spontaneous nature of a Perceiving type.
            </p>
          </div>
        </div>
      </div>

     {/* 🔹 按钮区域 */}
     <div className="bg-green-300 flex flex-row justify-between w-full max-w-[320px] md:max-w-[540px] mt-[81.07px] md:mt-[40px]">
        <button className="flex flex-row items-center justify-center w-[44px] md:w-[132px] h-[44px] bg-[#5777D0] rounded-[22px] text-[16px] font-[600] text-white " onClick={handlePreviousClick}>
               <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
               <path fillRule="evenodd" clipRule="evenodd" d="M2.45677 16.948L9.99943 24.4907L11.8848 22.6054L5.28477 16.0054L11.8848 9.40535L9.99943 7.52002L2.45677 15.0627C2.20681 15.3127 2.06638 15.6518 2.06638 16.0054C2.06638 16.3589 2.20681 16.698 2.45677 16.948Z" fill="white"/>
               </svg>
          <span className="hidden md:flex">Previous</span>
        </button>

        <button className=" w-[205px] h-[44px] bg-white rounded-[22px] border-[1px] border-[#C3C3C3] text-[16px] font-[600] text-black">
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
    </div>
  );
};

export default Result2;