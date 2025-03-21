'use client';
import React, { useState } from 'react';
import axios from 'axios';

interface SubmitPageProps {
  surveyData?: any;
}

const SubmitPage: React.FC<SubmitPageProps> = ({ surveyData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<number | null>(null);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Format data according to Flask's expected structure
      const requestData = {
        "user_info": {
            "email": "test@example.com",
            "ip": "127.0.0.1"
        },
        "some_data": "test"
      };

      const submitResponse = await axios.post('/api/proxy', requestData);
      console.log(submitResponse.data.submission_id);

      if (submitResponse.status === 200 || submitResponse.status === 202) {
        setSubmissionId(submitResponse.data.submission_id);
        setIsSubmitted(true);
        setTimeout(getResult, 1000);
      }
      console.log(submissionId);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit data');
    } finally {
      setIsLoading(false);
    }
  };
 
  const getResult = async () => {
    if (!submissionId) return;
    
    try {   
      setIsLoading(true);
      const response = await axios.get(`/api/proxy?submissionId=${submissionId}`);
      console.log(response);
      if (response.data.status === 'processing') {
        // If still processing, try again in 1 second
        setTimeout(getResult, 1000);
        return;
      }
      
      setResult(response);
    
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch result');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[540px] text-center">
        <h1 className="text-2xl font-bold mb-6">
          {isSubmitted ? 'Your Results' : 'Submit Your Survey'}
        </h1>
        
        {error && (
          <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

       
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`
              w-full md:w-[200px] 
              h-[44px] 
              rounded-[22px] 
              bg-[#5777D0] 
              text-white 
              font-bold
            `}
          >
            
          </button>

        <button
            onClick={getResult}
            disabled={isLoading}
            className={`
              w-full md:w-[200px] 
              h-[44px] 
              rounded-[22px] 
              bg-[#5777D0] 
              text-white 
              font-bold
            `}
          >
            getting result
        </button>
        <div> {result && 
           <div>{JSON.stringify(result.data.ai_output.output, null, 2)}</div>
            }</div>
      </div>
    </div>
  );
};

export default SubmitPage;