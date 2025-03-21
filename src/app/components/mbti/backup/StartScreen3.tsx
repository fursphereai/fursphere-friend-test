interface StartScreenProps {
  handleNext: () => void; 
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
const StartScreen: React.FC<StartScreenProps> = ({ handleNext, step, setStep, }) => (
  <>
    <div className="p-4 border rounded">
      <h1 className="text-xl font-bold">(If signup but no MBTI record)Welcome to Pet MBTI Test</h1>
      <p className="mt-2">Find out your pet's unique personality and unlock the Pawfect Match feature!</p>
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleNext}>Start Test</button>
      </div>
    </div>
    <div className="p-4 border rounded">
      <h1 className="text-xl font-bold">Pawfect Match</h1>
      <p className="mt-2">The Pawfect Match Quiz is a fun and interactive test that reveals how well your MBTI personality aligns with your pet’s! </p>
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleNext} >Start Test</button>
      </div>
    </div>
  </>
);
  
export default StartScreen;
  