import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const API_BASE_URL = 'http://localhost:5005';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.type === 'send_verification') {
      return await handleVerificationCode(body);
    }
    
    const response = await fetch(`${API_BASE_URL}/receive_data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    
    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error: any) {
    console.error('POST request failed:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Request failed',
        message: error.message
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}


async function handleVerificationCode(body: { email: string, code: string }) {
  try {
    const { email, code } = body;

    // Log to help debug
    console.log('Attempting to send email to:', email);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Use App Password instead of regular password
      },
      tls: {
        rejectUnauthorized: false // Only during development
      }
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('Transporter verified successfully');
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      throw new Error('Email service configuration error');
    }

    // Send the email
    const info = await transporter.sendMail({
      from: `"MBTI Test" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your MBTI Test Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your Verification Code</h2>
          <p>Here is your verification code: <strong>${code}</strong></p>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    console.log('Email sent successfully:', info.messageId);

    return new NextResponse(
      JSON.stringify({ 
        success: true,
        messageId: info.messageId 
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error: any) {
    console.error('Detailed error:', error);
    
    // More specific error messages
    let errorMessage = 'Failed to send verification code';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Network connection error';
    }

    return new NextResponse(
      JSON.stringify({
        error: errorMessage,
        message: error.message,
        code: error.code
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}




export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const submissionId = searchParams.get('submissionId') || '4';
    
    const response = await fetch(`${API_BASE_URL}/get_result/${submissionId}`);
    const responseText = await response.text();
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error: any) {
    console.error('GET request failed:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Request failed',
        message: error.message
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders
  });
} 