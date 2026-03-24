import { GoogleGenAI } from "@google/genai";
import { AI_PROMPTS } from "../prompts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateText(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      // 시스템 프롬프트(역할 부여) 적용
      systemInstruction: AI_PROMPTS.system,
      temperature: 0.7, // 창의성 조절 (0~2)
    }
  });

  return response.text;
}