'use client';

import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
	LogOut,
	User as UserIcon,
	Settings,
	Sparkles,
	MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

export default function UserPage() {
	const router = useRouter();
	const [user, setUser] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	// 1. 페이지 접속 시 세션(로그인 상태) 확인
	useEffect(() => {
		const checkAuth = async () => {
			const session = await getSession();

			if (!session?.user) {
				// 비로그인 상태면 로그인 페이지로 강제 이동
				router.push('/features/login');
			} else {
				setUser(session.user);
			}
			setIsLoading(false);
		};

		checkAuth();
	}, [router]);

	// 2. 로딩 중일 때 보여줄 스피너 UI
	if (isLoading) {
		return (
			<div className="flex h-[70vh] items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-ui-border border-t-brand-primary"></div>
			</div>
		);
	}

	// 로딩이 끝났는데 유저가 없다면 (리다이렉트 중) 아무것도 그리지 않음
	if (!user) return null;

	return (
		<div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
			<h1 className="mb-8 text-2xl font-bold text-ui-text-main">마이페이지</h1>

			<div className="grid gap-6 md:grid-cols-3">
				{/* 왼쪽: 프로필 요약 카드 */}
				<div className="md:col-span-1">
					<div className="overflow-hidden rounded-2xl border border-ui-border bg-ui-card p-6 shadow-sm">
						<div className="flex flex-col items-center text-center">
							{/* 프로필 이미지 (소셜 로그인 연동 시) */}
							{user.image ? (
								<Image
									src={user.image}
									alt="Profile"
									width={96}
									height={96}
									className="mb-4 h-24 w-24 rounded-full object-cover shadow-md ring-2 ring-ui-border"
								/>
							) : (
								<div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-ui-bg border border-ui-border text-brand-primary shadow-md">
									<UserIcon size={40} />
								</div>
							)}

							<h2 className="text-xl font-bold text-ui-text-main">
								{user.name || '사용자'}
							</h2>
							<p className="mb-6 text-sm text-ui-text-muted">
								{user.email || '이메일 정보 없음'}
							</p>

							{/* 로그아웃 버튼 */}
							<button
								onClick={() => signOut({ callbackUrl: '/' })}
								className="flex w-full items-center justify-center gap-2 rounded-xl bg-ui-bg py-2.5 text-sm font-medium text-ui-text-main hover:bg-ui-border transition-colors border border-ui-border shadow-sm active:scale-95"
							>
								<LogOut size={16} />
								로그아웃
							</button>
						</div>
					</div>
				</div>

				{/* 오른쪽: 상세 정보 및 플랫폼 활동 내역 */}
				<div className="md:col-span-2 space-y-6">
					{/* 계정 정보 섹션 */}
					<div className="rounded-2xl border border-ui-border bg-ui-card p-6 shadow-sm">
						<h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-ui-text-main">
							<Settings
								size={20}
								className="text-brand-primary"
							/>
							계정 정보
						</h3>
						<div className="space-y-4">
							<div>
								<p className="text-xs font-medium text-ui-text-dim">
									이름 (닉네임)
								</p>
								<p className="mt-1 text-sm text-ui-text-main font-medium">
									{user.name || '-'}
								</p>
							</div>
							<div>
								<p className="text-xs font-medium text-ui-text-dim">
									이메일 주소
								</p>
								<p className="mt-1 text-sm text-ui-text-main font-medium">
									{user.email || '-'}
								</p>
							</div>
						</div>
					</div>

					{/* 활동 내역 바로가기 (캐릭터 / 채팅) */}
					<div className="grid gap-4 sm:grid-cols-2">
						<Link
							href="/features/character"
							className="group rounded-2xl border border-ui-border bg-ui-card p-5 shadow-sm hover:border-brand-primary/50 transition-colors cursor-pointer"
						>
							<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
								<Sparkles size={20} />
							</div>
							<h4 className="font-semibold text-ui-text-main group-hover:text-brand-primary transition-colors">
								나의 캐릭터
							</h4>
							<p className="mt-1 text-xs text-ui-text-muted">
								내가 직접 설정하고 생성한 AI 캐릭터 관리
							</p>
						</Link>

						<Link
							href="/features/chat"
							className="group rounded-2xl border border-ui-border bg-ui-card p-5 shadow-sm hover:border-brand-primary/50 transition-colors cursor-pointer"
						>
							<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
								<MessageSquare size={20} />
							</div>
							<h4 className="font-semibold text-ui-text-main group-hover:text-brand-primary transition-colors">
								최근 대화
							</h4>
							<p className="mt-1 text-xs text-ui-text-muted">
								다양한 캐릭터들과 나누었던 대화 기록
							</p>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
