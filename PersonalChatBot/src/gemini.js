import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export default async function main(prompt) {
  if (!apiKey) throw new Error('Missing VITE_GEMINI_API_KEY');

  const ai = new GoogleGenAI({ apiKey });

  try {
    const stream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash', // fast + cheaper
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    let full = '';
    for await (const chunk of stream) {
      full += chunk.text || '';
    }
    return full.trim();
  } catch (err) {
    console.error('Gemini error:', err);
    return 'Sorry, something went wrong. Please try again.';
  }
}