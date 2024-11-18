import { NextResponse } from 'next/server';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

// Set runtime to 'edge'
export const runtime = 'edge';

// Initialize with API key (ensure this is available in the environment)
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY, // Ensure this is configured correctly
});

export async function POST() {
  try {
    // Hard-coded prompt
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment  ";

    // Generate the response using the `generateText` function
    const { text } = await generateText({
      model: google('gemini-1.5-pro-latest'),
      prompt,
    });

    // Return the generated response
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating the response', details: error.message },
      { status: 500 }
    );
  }
}
