import { NextRequest, NextResponse } from 'next/server';
import { getJson } from 'serpapi';

const SERPAPI_KEY = process.env.SERPAPI_KEY || '22537f15f67af3a5b2da664715a88d57047d5ef77942ca76b91e4300d565486c';

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Extract the main topic name to use as search keyword
    const topicName = topic.split('-').pop()?.trim() || topic.split(':').pop()?.trim() || topic.trim();
    
    console.log('🔍 Searching Google Images for topic:', topicName);

    // Search Google Images using SerpAPI
    const searchResults: any = await new Promise((resolve, reject) => {
      getJson({
        q: topicName,
        engine: 'google_images',
        ijn: '0',
        api_key: SERPAPI_KEY
      }, (json: any) => {
        if (json.error) {
          reject(new Error(json.error));
        } else {
          resolve(json);
        }
      });
    });

    // Extract the first image result
    if (!searchResults.images_results || searchResults.images_results.length === 0) {
      console.error('❌ No image results found for topic:', topicName);
      throw new Error('No images found for this topic');
    }

    const firstImage = searchResults.images_results[0];
    const imageUrl = firstImage.original || firstImage.thumbnail;

    if (!imageUrl) {
      console.error('❌ No image URL found in first result');
      throw new Error('Failed to extract image URL from search results');
    }

    console.log('✅ Image found successfully:', imageUrl);

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
    });

  } catch (error: any) {
    console.error('❌ Image generation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
