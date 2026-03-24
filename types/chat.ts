export interface Message {
  role: 'user' | 'ai'
  text: string
}

export interface ChatListItem {
    id: string;
    title: string | null;
    userId: string;
    characterId: string;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
    // getChats에서 include로 가져온 캐릭터 정보
    character?: {
        name: string;
        imageUrl: string | null;
    };
}