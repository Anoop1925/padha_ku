import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json();
    
    // Call Flask backend on port 5000
    const backendUrl = process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL || 'https://magic-learn-backend.onrender.com';
    const response = await fetch(`${backendUrl}/api/analyze-drawing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error analyzing drawing:', error);
    return NextResponse.json(
      { error: 'Failed to analyze drawing' },
      { status: 500 }
    );
  }
}
