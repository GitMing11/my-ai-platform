# 🛠 SETUP LOG

> 프로젝트 환경 설정 / 라이브러리 설치 / 에러 해결 기록

---

## 📅 2026-03-02

### 프로젝트 생성

```bash
npx create-next-app@latest my-ai-platform --yes
```

### Tailwind 설치

```bash
npm install -D tailwindcss postcss autoprefixer

npm install @prisma/client next-auth @auth/prisma-adapter lucide-react
npm install -D prisma
```

### 발생한 에러

프로젝트 생성 시 에러 발생

- ENOENT(Error No Entry): AppData\Roaming\npm 없음
- 해결: npm 폴더 직접 생성

---

npx prisma init

npm install --save-dev prisma dotenv

npx prisma db push

npx prisma migrate dev --name init

---

## 📅 2026-03-03

https://console.cloud.google.com
[API] 구글 로그인 API (구글 OAuth 2.0 웹 로그인) - https://minibcake.tistory.com/222

OAuth 동의 화면 - 외부 - 만들기
클라이언트 생성 -> 데이터 액세스 - 범위 추가

npm install next-auth@beta @auth/prisma-adapter

npm install ai @ai-sdk/google

npm install zod

npm install clsx tailwind-merge sonner

## npm install @supabase/supabase-js

## 📅 2026-03-04

### 발생한 에러

app/generate에 migrations 저장되던 상태

- 해결:

```bash
npx prisma migrate reset
npx prisma migrate dev --name init
```

npm install @supabase/ssr

### 발생한 에러

환경 변수 인식 문제나 런타임 설정 충돌로 인해 Prisma가 DB에 직접 연결할 방법을 찾지 못함

- 해결:

```bash
npm install @prisma/adapter-pg pg

npm install --save-dev @types/pg
```

### 중요 - lib/prisma.ts 설정

```bash
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

declare global {
  var prisma: PrismaClient | undefined;
  var pgPool: Pool | undefined;
}

/**
 * PostgreSQL Pool
 * - Vercel / Serverless 환경에서 필수
 * - Supabase Pooler URL 사용 권장
 */
const pool =
  global.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
    max: 10,               // 최대 커넥션 수 (안전)
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 2_000,
  });

if (process.env.NODE_ENV !== 'production') {
  global.pgPool = pool;
}

/**
 * Prisma Adapter
 */
const adapter = new PrismaPg(pool);

/**
 * Prisma Client (Singleton)
 */
export const prisma =
  global.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'warn', 'error']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
```
