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

npx prisma init

npm install dotenv
