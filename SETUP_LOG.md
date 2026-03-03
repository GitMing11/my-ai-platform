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

https://console.cloud.google.com
[API] 구글 로그인 API (구글 OAuth 2.0 웹 로그인) - https://minibcake.tistory.com/222

OAuth 동의 화면 - 외부 - 만들기
클라이언트 생성 -> 데이터 액세스 - 범위 추가

npm install next-auth@beta @auth/prisma-adapter

npm install ai @ai-sdk/google

npm install zod

npm install clsx tailwind-merge sonner

npm install @supabase/supabase-js
