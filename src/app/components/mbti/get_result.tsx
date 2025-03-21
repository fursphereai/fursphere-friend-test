'use client';
import axios from 'axios';

interface ResultResponse {
  status: string;
  ai_output?: {
    output: any;
  };
}

export const getResult = async (submissionId: number): Promise<ResultResponse> => {
  try {
    const response = await axios.get(`/api/proxy?submissionId=${submissionId}`);
    console.log(response);
    
    if (response.data.status === 'processing') {
      // If still processing, wait 1 second and try again
      await new Promise(resolve => setTimeout(resolve, 1000));
      return getResult(submissionId);
    }
    
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to fetch result');
  }
};