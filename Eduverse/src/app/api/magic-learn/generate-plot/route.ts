import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { theme } = await request.json();

    if (!theme) {
      return NextResponse.json(
        { error: 'No theme provided' },
        { status: 400 }
      );
    }

    // Call Flask backend on port 5000
    const backendUrl = process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL || 'https://magic-learn-backend.onrender.com';
    const response = await fetch(`${backendUrl}/api/generate-plot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ theme }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error generating plot:', error);
    return NextResponse.json(
      { error: 'Failed to generate plot' },
      { status: 500 }
    );
  }
}
