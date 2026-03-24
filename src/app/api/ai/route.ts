import { NextRequest, NextResponse } from "next/server";
import { generateText, AiMessage } from "@/src/lib/ai/providers/gemini";
import { prisma } from "@/src/lib/prisma";
import { buildCharacterPrompt } from "@/src/lib/ai/prompts";

export async function POST(req: NextRequest) {
  try {
    // 프론트에서 넘어온 메시지와 캐릭터 ID 수신
    const { message, characterId, chatId } = await req.json();

    let dynamicSystemPrompt = undefined;

    // 1. 캐릭터 설정에 따른 시스템 프롬프트 조립
    if (characterId && characterId !== 'default-character') {
      const character = await prisma.character.findUnique({
        where: { id: characterId },
      });

      if (character) {
        dynamicSystemPrompt = character.customPrompt || buildCharacterPrompt(character);
      }
    }

    let formattedMessages: AiMessage[] = [];

    // 2. DB에서 최근 대화 내역 불러오기
    if (chatId) {
      const recentMessages = await prisma.message.findMany({
        where: { chatId },
        orderBy: { createdAt: 'desc' }, // 최신순 정렬
        take: 7, // 최근 7개 메시지 (약 3번의 주고받은 턴) 기억
      });

      // 시간순(오름차순)으로 다시 뒤집고 Gemini 포맷에 맞게 매핑
      formattedMessages = recentMessages.reverse().map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));
    } else {
      // chatId가 혹시 없을 경우를 대비한 폴백 (최초 1회 전송)
      formattedMessages = [{ role: 'user', parts: [{ text: message }] }];
    }

    // 3. AI로 대화 내역 전체를 전달하여 응답 생성
    const result = await generateText(formattedMessages, dynamicSystemPrompt);

    return NextResponse.json({ result });
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}