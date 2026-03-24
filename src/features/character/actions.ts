'use server';

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { CharacterPayload } from "@/src/types/character";
import { ROUTES } from "@/src/constants/routes";

// 1. 캐릭터 생성 (Create)
export async function createCharacter(userId: string, data: CharacterPayload) {
    const character = await prisma.character.create({
        data: {
            ...data,
            creatorId: userId,
        },
    });
    revalidatePath(ROUTES.CHARACTER.LIST); // 목록 새로고침
    return character;
}

// 2. 캐릭터 목록 조회 (Read - List)
export async function getCharacters(userId: string) {
    return await prisma.character.findMany({
        where: { creatorId: userId },
        orderBy: { updatedAt: 'desc' },
    });
}

// 3. 단일 캐릭터 조회 (Read - Detail)
export async function getCharacterById(id: string) {
    return await prisma.character.findUnique({
        where: { id },
    });
}

// 4. 캐릭터 수정 (Update)
export async function updateCharacter(id: string, data: Partial<CharacterPayload>) {
    const character = await prisma.character.update({
        where: { id },
        data,
    });
    revalidatePath(ROUTES.CHARACTER.LIST); // 목록 새로고침
    revalidatePath(ROUTES.CHARACTER.EDIT(id));
    return character;
}

// 5. 캐릭터 삭제 (Delete)
export async function deleteCharacter(id: string) {
    await prisma.character.delete({
        where: { id },
    });
    revalidatePath(ROUTES.CHARACTER.LIST);
}