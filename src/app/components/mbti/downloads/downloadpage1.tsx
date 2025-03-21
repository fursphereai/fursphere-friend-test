import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleSubmit } from '../submit_result'; 
import { getResult } from '../get_result';
import html2canvas from 'html2canvas';

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


export const generateDownload = async () => {
  const elementToCapture = document.getElementById('download-content');
  if (!elementToCapture) {
    console.error('Element not found');
    return;
  }

  try {
    const canvas = await html2canvas(elementToCapture, {
      scale: 2, // Higher quality
      useCORS: true, // If you have external images
      backgroundColor: '#ffffff', // White background
      allowTaint: true,
      logging: true
    });
    
    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.href = image;
    link.download = 'pet-personality-result.png';
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
  }
};

export default function DownloadPage1() {
  return (
      <motion.div id="download-content"  className="relative bg-red-300 w-[800px] h-[1000px] flex flex-col z-10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    duration: 0.3
          }}>
      

          <div className="w-[540px] mt-[149px] ml-[40px] bg-blue-300 text-[128px] font-[Ubuntu] font-[700] text-[#FFFFFF] leading-[1.2] tracking-[4.12px]">
            <h2>INTP</h2>
          </div>

          <div className="w-[540px] mt-[20px] ml-[40px] text-[32px] font-[Ubuntu] font-[500] uppercase text-[#FFFFFF] leading-[1.2] tracking-[0.12px]">
            <h2>“I like my quiet corner with my cozy blanket!”</h2>
          </div>

         

          <img src="/NT.svg" alt="NT" className="bg-white absolute top-[0] left-[0] w-[640px] h-[640px] -z-10 "/>
    
          <div className="flex bg-red-500  ml-[40px] mt-[75px]  flex-row">

            <div className="w-[346px] h-[346px] bg-white
            border-[4px] border-[#4B367B] rounded-[40px]">
              <img src="/logo.svg" alt="download" className="w-[346px] h-[346px]"/>
            </div>

            <div className="w-[350px] mt-[50px] ml-[24px] flex flex-col bg-blue-500">
              <h2 className="text-right text-[24px] font-[Inter] font-[710] uppercase text-[#000000] leading-[1.2]">
                [ Mingming ]
              </h2>
              <h2 className="text-right mt-[12px] text-[16px] font-[Inter] font-[710] text-[#4B367B] leading-[1.2] tracking-[0.12px]">
                [ Mingming ]
              </h2>
              <h2 className="text-left mt-[32px] text-[24px] font-[Inter] font-[400] text-[#1C1C1C] leading-[1.2] tracking-[0.12px]">
                Mingming focuses on the tangible and immediate surroundings, finding comfort in familiar routines and experiences that engage the senses more than abstract concepts.
              </h2>
            </div>
          
          </div>

          <div className="flex bg-red-500  mt-[98px] items-center justify-center">
            <img src="/input_box.svg" alt="input_box" className="w-[418px] h-[44px]"/>
          </div>
        

      </motion.div>
     
 );
}

 