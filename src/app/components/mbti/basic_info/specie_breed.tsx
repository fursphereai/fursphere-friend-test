'use client'; 
import React, { useEffect, useState,useRef, ReactElement } from 'react';

interface SurveyData {
  pet_info: {
    PetSpecies: string;
    PetBreed: string,
    PetBreedCustom: string,
  };
}


interface SpecieBreedProps {
    handleNext: () => void; 
    handleBack: () => void;
    surveyData: SurveyData;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    updateAnswer: (category: keyof SurveyData, subCategory: any | null, field: string, value: string) => void;
}





const SpecieBreed: React.FC<SpecieBreedProps>  = ({ handleNext, handleBack, step, setStep, surveyData, updateAnswer  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [isOpen2, setIsOpen2] = useState(false);
  const [selected2, setSelected2] = useState('');
  const PetSpecies: string[] =  [
    'Dog', 'Cat', 'Others'
  ];
  
  const [customBreed, setCustomBreed] = useState(surveyData.pet_info.PetBreedCustom || '');
  const [Breed, setBreed] = useState('');

  const getPetBreed = (PetSpecies: string): string[] => {
    switch (PetSpecies) {
      case 'Dog':
        return ['Hound', 'Mastiff', 'Retriever', 'Shepherd', 'Sighthound', 'Spitz-type', 'Spaniel', 'Terrier', 'Toy Dogs', 'Working Dogs'];
      case 'Cat':
        return ['Folded Ear', 'Hairless Cats', 'Hybrid Breeds', 'Longhair Cats', 'Natural Breeds', 'Oriental Cats', 'Shorthair Cats'];
      default:
        return ['Others'];
    }
  };
  

  const PetBreed = getPetBreed(selected);

  useEffect(() => {
    setSelected2('');
  }, [selected]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleNextPage2 = () => {
    
    if (surveyData.pet_info.PetSpecies && surveyData.pet_info.PetBreed) {
      handleNext(); 
    } 
  };

  const getNextButtonColor = () => {
    return surveyData.pet_info.PetSpecies && surveyData.pet_info.PetBreed
      ? '#5777D0' // Blue when not 5
      : '#C3C3C3'; // Gray when 5
  };
  const currentOptionRef = useRef<string>('');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto max-w-[1440px] h-[calc(100svh-40px)] md:h-[calc(100vh-140px)] flex flex-col items-center justify-center">

     
      
          
        <div className=" relative flex flex-col  items-center  w-full mx-auto h-full ">

          <div className="  max-w-[540px] flex flex-col items-left  h-full">
            <label className="
                    mt-[40px] md:mt-[85px]
                    text-[16px] md:text-[18px]
                    font-[Inter]
                    font-[400]
                    ml-[10px]
                        ">My pet is a
            </label>

          <div className="  flex flex-row w-[320px] md:w-[540px] h-[44px] mt-[19px]">


          <div className=" relative flex flex-row w-[130px] md:w-[260px] h-[44px]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              w-full h-full
              pl-[16px] 
              border border-[#717680] border-[1px]
              rounded-[22px]
              bg-white
              focus:outline-none focus:border-[#FFC542]
              font-[Inter]
              text-left
              ${surveyData.pet_info.PetSpecies ? 'text-[#27355D]' : 'text-[#C3C3C3]'}
              text-[16px]
              `}
            >
          {surveyData.pet_info.PetSpecies || 'Species'}
        </button>

          <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none">
            <svg 
              width="10" 
              height="6" 
              viewBox="0 0 10 6" 
              fill="none"
              className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            >
              <path 
                d="M1 1L5 5L9 1" 
                stroke="#717680" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
                {/* Dropdown menu */}
        {isOpen && (
          <div className="
            md:flex hidden
            bg-[#FFFFFF]
            absolute
            top-[60px]
            w-full
            text-[16px]
            bg-white
            border border-[1px] border-[#F8F8F8]
            rounded-[22px]
            shadow-lg
            py-[6px]
            px-[6px]
            z-10
          ">
            <div className="
              max-h-[150px]
              w-[240px]
              overflow-y-auto
              pr-[15px]
        
            
            ">
            {PetSpecies.map((option: string) => (
              <div
                key={option}
                onClick={() => {
                  updateAnswer('pet_info', null, 'PetSpecies', option);
                  setIsOpen(false);
                  setSelected(option);
                }}
                className={`
            
                  px-[10px]
                  py-[13px]
                  hover:bg-[#F8F8F8]
                  cursor-pointer
                  font-[Inter]
                  text-[#27355D]
                  rounded-[22px]
                `}
              >
                {option}
              </div>
           
              ))}
            </div>
            </div>
         )}

          {isOpen && (
                  <>
                    <div 
                      className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 overflow-hidden"
                      onClick={() => setIsOpen(false)}
                    />
                    <div className="md:hidden fixed bg- bottom-0 bg-[#FFFFFFCC] h-[327px] left-0 right-0  z-50">
                      <div className="flex  justify-between items-center px-[20px] pt-[30px] pb-[11px]">
                        <button 
                          className="text-[#61616180] text-[Ubuntu] font-[400] text-[14px]" 
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          className="text-[#27355D] text-[Ubuntu] font-[400] text-[14px]" 
                          onClick={() => {
                            console.log(currentOptionRef.current);
                            if (currentOptionRef.current) {
                              setSelected(currentOptionRef.current);
                              updateAnswer('pet_info', null, 'PetSpecies', currentOptionRef.current);
                            }
                            setIsOpen(false);
                          }}
                        >
                          Save
                        </button>
                      </div>
                      <div className="relative mx-[20px] h-[200px] overflow-hidden">
                        <div className="absolute inset-0  flex items-center justify-center pointer-events-none">
                          <div className=" w-full h-[50px] bg-[#D1D7EF] opacity-20" />
                        </div>
                        <div 
                          className="h-full bg-[#FFFFFF] rounded-[6px] overflow-auto snap-y snap-mandatory"
                          style={{
                            WebkitOverflowScrolling: 'touch',
                            scrollSnapType: 'y mandatory',
                            paddingTop: '100px',
                            paddingBottom: '100px'
                          }}
                          onScroll={(e) => {
                            const target = e.target as HTMLDivElement;
                            const elements = target.getElementsByClassName('species-option');
                            const containerRect = target.getBoundingClientRect();
                            const centerY = containerRect.top + containerRect.height / 2;

                            for (let i = 0; i < elements.length; i++) {
                              const element = elements[i] as HTMLElement;
                              const rect = element.getBoundingClientRect();
                              if (Math.abs(rect.top + rect.height/2 - centerY) < rect.height/2) {
                                currentOptionRef.current = element.dataset.species || '';
                                break;
                                }
                              }
                            }
                          }
                          >
                          {PetSpecies.map((species) => (
                            <div
                              key={species}
                              data-species={species}
                              className={`species-option bg-[#FFFFFF] h-[50px] flex items-center justify-center snap-center text-[14px] font-[400]`}
                            >
                              {species}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

          </div>

          <div className="relative flex flex-row ml-[20px] w-[180px] md:w-[260px] h-[44px]">
          <button
            onClick={() => setIsOpen2(!isOpen2)}
            className={`
              w-full h-full
              pl-[16px] 
              border border-[#717680] border-[1px]
              rounded-[22px]
              bg-white
              focus:outline-none focus:border-[#FFC542]
              font-[Inter]
              text-left
             ${surveyData.pet_info.PetBreed ? 'text-[#27355D]' : 'text-[#C3C3C3]'}
              text-[16px]
          `}
          >
          {surveyData.pet_info.PetBreed || 'Breed'}

        </button>

          <div className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none">
            <svg 
              width="10" 
              height="6" 
              viewBox="0 0 10 6" 
              fill="none"
              className={`transform transition-transform duration-200 ${isOpen2 ? 'rotate-180' : ''}`}
            >
              <path 
                d="M1 1L5 5L9 1" 
                stroke="#717680" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
                {/* Dropdown menu */}
        {isOpen2 && (
          <div className="
            md:flex hidden
            bg-[#FFFFFF]
            absolute
            top-[60px]
            w-full
            text-[16px]
            bg-white
            border border-[1px] border-[#F8F8F8]
            rounded-[22px]
            shadow-lg
            py-[6px]
            px-[6px]
            z-10
          ">
            <div className="
              w-[240px]
              max-h-[150px]
              overflow-y-auto
              pr-[15px]
            
            ">
            {PetBreed.map((option: string) => (
              <div
                key={option}
                onClick={() => {
                  updateAnswer('pet_info', null, 'PetBreed', option);
                  setIsOpen2(false);
                  setSelected2(option);
                  setBreed(option);
                }}
                className={`

                  px-[10px]
                  py-[13px]
                  hover:bg-[#F8F8F8]
                  cursor-pointer
                  font-[Inter]
                  text-[#27355D]
                  rounded-[22px]
                `}
              >
                {option}
              </div>
           
              ))}
            </div>
            </div>
         )}


{isOpen2 && (
                  <>
                    <div 
                      className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 overflow-hidden"
                      onClick={() => setIsOpen2(false)}
                    />
                    <div className="md:hidden fixed bg- bottom-0 bg-[#FFFFFFCC] h-[327px] left-0 right-0  z-50">
                      <div className="flex  justify-between items-center px-[20px] pt-[30px] pb-[11px]">
                        <button 
                          className="text-[#61616180] text-[Ubuntu] font-[400] text-[14px]" 
                          onClick={() => setIsOpen2(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          className="text-[#27355D] text-[Ubuntu] font-[400] text-[14px]" 
                          onClick={() => {
                            console.log(currentOptionRef.current);
                            if (currentOptionRef.current) {
                              setSelected2(currentOptionRef.current);
                              updateAnswer('pet_info', null, 'PetBreed', currentOptionRef.current);
                            }
                            setIsOpen2(false);
                          }}
                        >
                          Save
                        </button>
                      </div>
                      <div className="relative mx-[20px] h-[200px] overflow-hidden">
                        <div className="absolute inset-0  flex items-center justify-center pointer-events-none">
                          <div className=" w-full h-[50px] bg-[#D1D7EF] opacity-20" />
                        </div>
                        <div 
                          className="h-full bg-[#FFFFFF] rounded-[6px] overflow-auto snap-y snap-mandatory"
                          style={{
                            WebkitOverflowScrolling: 'touch',
                            scrollSnapType: 'y mandatory',
                            paddingTop: '100px',
                            paddingBottom: '100px'
                          }}
                          onScroll={(e) => {
                            const target = e.target as HTMLDivElement;
                            const elements = target.getElementsByClassName('breed-option');
                            const containerRect = target.getBoundingClientRect();
                            const centerY = containerRect.top + containerRect.height / 2;

                            for (let i = 0; i < elements.length; i++) {
                              const element = elements[i] as HTMLElement;
                              const rect = element.getBoundingClientRect();
                              if (Math.abs(rect.top + rect.height/2 - centerY) < rect.height/2) {
                                currentOptionRef.current = element.dataset.breed || '';
                                break;
                                }
                              }
                            }
                          }
                          >
                          {PetBreed.map((breed) => (
                            <div
                              key={breed}
                              data-breed={breed}
                              className={`breed-option bg-[#FFFFFF] h-[50px] flex items-center justify-center snap-center text-[14px] font-[400]`}
                            >
                              {breed}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

          </div>

          </div>




          <label className="
                  
                  w-[300px] md:w-full
                  text-[14px] md:text-[16px]
                  leading-normal
                  font-[Inter]
                  font-[400]
                  text-[#A0A0A0]
                  mt-[20px] ml-[10px]
                      ">*If you can not find your pet's breed in our list, please enter here
          </label>
          <input 
              type="text"
              placeholder="Please enter a breed / species"
              className="
              w-[320px] md:w-[540px] 
              h-[44px]
              mt-[20px]
              py-[12px] pl-[12px] 
              border border-[1px] border-[#717680]
              rounded-[22px]
              bg-white
              font-[Inter]
              text-[#27355D]
              focus:outline-none
              placeholder:[#C3C3C3]
              text-[16px]"
              value={customBreed}
              onChange={(e) => {
                setCustomBreed(e.target.value);
                updateAnswer('pet_info', null, 'PetBreedCustom', e.target.value)}
              }
          />

         
          <button 
            className="
            absolute max-md:bottom-[48px] top-[393px]
            w-[44px] md:w-[101px] 
            h-[44px]
            self-end
            rounded-[22px]
            text-[16px]
            text-white
            "
            onClick={handleNextPage2}
            style={{ background: getNextButtonColor() }}
            >
              <span className="hidden md:inline">Next</span>
              <svg className="inline md:hidden" xmlns="http://www.w3.org/2000/svg" width="16" height="32" viewBox="0 0 16 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.5432 16.948L6.00057 24.4907L4.11523 22.6054L10.7152 16.0054L4.11523 9.40535L6.00057 7.52002L13.5432 15.0627C13.7932 15.3127 13.9336 15.6518 13.9336 16.0054C13.9336 16.3589 13.7932 16.698 13.5432 16.948Z" fill="white"/>
              </svg>
          </button>

          {/* <button onClick={() => setIsPopupOpen(true)}>
            Open Popup
          </button> */}

          {/* <Popup 
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSave={() => {
              // Handle save action
              setIsPopupOpen(false);
            }}
          /> */}

          
          
          </div>
           
        </div>
    </div>

  );
};



interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50">
      <div 
        className="
          fixed 
          bottom-0 
          left-0 
          right-0 
          bg-white 
          rounded-t-[20px]
          animate-slide-up
        "
      >
        {/* Header */}
        <div className="flex justify-between px-4 py-3 border-b">
          <button 
            onClick={onClose}
            className="text-[#717680] text-[16px]"
          >
            Cancel
          </button>
          <button 
            onClick={onSave}
            className="text-[#5777D0] text-[16px] font-medium"
          >
            Save
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          <div className="space-y-4">
            <div className="py-3 text-center text-[16px] text-[#27355D] active:bg-gray-100">
              Cat
            </div>
            <div className="py-3 text-center text-[16px] text-[#27355D] active:bg-gray-100">
              Dog
            </div>
            <div className="py-3 text-center text-[16px] text-[#27355D] active:bg-gray-100">
              Other
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SpecieBreed;




