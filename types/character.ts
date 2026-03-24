// types/character.ts

export interface CharacterPayload {
  name: string;
  personality?: string | null;
  speechStyle?: string | null;
  appearance?: string | null;
  imageUrl?: string | null;
  genre?: string | null;
  worldview?: string | null;
  castSetup?: string | null;
  customPrompt?: string | null;
  isPublic?: boolean;
}