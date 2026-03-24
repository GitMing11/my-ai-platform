'use server'; 

import { prisma } from "@/lib/prisma";

// 대화 목록 가져오기
export async function getChats(userId: string) {
  return await prisma.chat.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  });
}

// 특정 대화의 메시지들 가져오기
export async function getMessages(chatId: string) {
  return await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: 'asc' },
  });
}