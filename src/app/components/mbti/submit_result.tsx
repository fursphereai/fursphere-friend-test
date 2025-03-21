'use client';
import axios from 'axios';
import { getResult } from './get_result';
interface SurveyData {
  email?: string;
  [key: string]: any;
}

export const handleSubmit = async (surveyData: SurveyData) => {
  try {
    const requestData = {
      "user_info": {
          "email": surveyData.email || "test@example.com",
          "ip": "127.0.0.1"
      },
      "survey_data": surveyData
    };

    const submitResponse = await axios.post('/api/proxy', requestData);
  
    const submissionId = submitResponse.data;
    console.log('Submission ID:', submissionId);
    return submissionId;

    if (submitResponse.status === 200 || submitResponse.status === 202) {
      return {
        submissionId: submitResponse.data.submission_id,
        success: true
      };
    }
    return { success: false, error: 'Submission failed' };
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Failed to submit data');
  }
};