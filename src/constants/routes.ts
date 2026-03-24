// src/constants/routes.ts

export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
  },
  USER: {
    PROFILE: '/user',
  },
  CHARACTER: {
    LIST: '/character',
    NEW: '/character/new',
    EDIT: (id: string) => `/character/${id}/edit`, 
    DETAIL: (id: string | number) => `/character/${id}`,
  },
  CHAT: {
    ROOM: '/chat',
  }
} as const;