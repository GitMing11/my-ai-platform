import { GoogleGenAI } from "@google/genai";
import { AI_PROMPTS } from "../prompts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export type AiMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export async function generateText(messages: AiMessage[], systemInstruction?: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: messages,
    config: {
      systemInstruction: systemInstruction || AI_PROMPTS.system,
      temperature: 0.8,
    }
  });

  return response.text;
}