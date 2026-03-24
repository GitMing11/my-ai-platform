import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/ai/providers/gemini";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const result = await generateText(message);

  return NextResponse.json({ result });
}