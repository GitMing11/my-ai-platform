'use server';

import { prisma } from "@/lib/prisma";
import { MessageRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

/**
 * 1. Create: 새로운 대화방 생성
 */
export async function createChat(userId: string, characterId: string, title: string = "새로운 스토리") {
	const chat = await prisma.chat.create({
		data: {
			userId,
			characterId,
			title,
		}
	});
	
	revalidatePath('/'); // 대화 목록 갱신을 위해 경로 캐시 무효화
	return chat;
}

/**
 * 2. Read: 대화 목록 및 메시지 조회
 */
// 유저의 모든 대화 목록 가져오기 (캐릭터 정보 포함하면 화면 구성에 유리함)
export async function getChats(userId: string) {
	return await prisma.chat.findMany({
		where: { userId },
		include: {
			character: {
				select: { name: true, imageUrl: true }
			}
		},
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

/**
 * 3. Update: 대화방 정보 수정
 */
// 대화 제목 수정 (AI가 요약해서 자동으로 바꿔줄 때 유용함)
export async function updateChatTitle(chatId: string, newTitle: string) {
	return await prisma.chat.update({
		where: { id: chatId },
		data: { title: newTitle }
	});
}

// 대화방 아카이브 (삭제 대신 목록에서 숨기기용)
export async function archiveChat(chatId: string) {
	return await prisma.chat.update({
		where: { id: chatId },
		data: { isArchived: true }
	});
}

/**
 * 4. Delete: 대화방 영구 삭제
 */
export async function deleteChat(chatId: string) {
	await prisma.chat.delete({
		where: { id: chatId }
	});
	
	revalidatePath('/');
	return { success: true };
}

/**
 * 5. Message: 메시지 저장
 */
export async function saveMessage(chatId: string, role: MessageRole, content: string) {
	const message = await prisma.message.create({
		data: {
			chatId,
			role,
			content,
		}
	});

	// 메시지가 추가되면 대화방의 updatedAt을 갱신하여 목록 상단으로 올림
	await prisma.chat.update({
		where: { id: chatId },
		data: { updatedAt: new Date() }
	});

	return message;
}