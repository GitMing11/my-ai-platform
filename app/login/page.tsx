'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
	return (
		<div className="flex min-h-screen flex-col bg-ui-bg text-ui-text-main">
			{/* 배경 그라데이션 효과 */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-brand-primary)_0%,transparent_70%)] opacity-10 -z-10" />

			<main className="flex flex-1 items-center justify-center px-4">
				<div className="w-full max-w-md space-y-8 rounded-3xl border border-ui-border bg-ui-card p-10 backdrop-blur-xl shadow-2xl">
					<div className="text-center">
						<Link
							href="/"
							className="inline-block text-3xl font-bold tracking-tighter mb-2"
						>
							GEMINI <span className="text-brand-primary">AI</span>
						</Link>
						<p className="text-ui-text-muted">
							로그인하고 프라이빗 AI 에이전트를 만나보세요.
						</p>
					</div>

					<div className="space-y-4">
						<button
							onClick={() => signIn('google', { callbackUrl: '/' })}
							className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.98]"
						>
							<svg
								className="h-5 w-5"
								viewBox="0 0 24 24"
							>
								<path
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									fill="#4285F4"
								/>
								<path
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									fill="#34A853"
								/>
								<path
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
									fill="#FBBC05"
								/>
								<path
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									fill="#EA4335"
								/>
							</svg>
							Google로 시작하기
						</button>
					</div>

					<div className="text-center text-xs text-ui-text-dim leading-relaxed">
						로그인 시 서비스 이용약관 및 개인정보 처리방침에 <br />
						동의하는 것으로 간주합니다.
					</div>
				</div>
			</main>

			<footer className="py-8 text-center text-xs text-ui-text-dim">
				© 2026 AI Platform Project.
			</footer>
		</div>
	);
}
