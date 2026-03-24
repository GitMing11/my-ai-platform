'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X, LogIn, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // NextAuth 훅 임포트
import Image from 'next/image';

export default function Header() {
	const pathname = usePathname();
	const { isDarkMode, toggleTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// NextAuth를 통해 현재 세션(로그인 유저 정보)과 상태를 가져옵니다.
	const { data: session, status } = useSession();
	const user = session?.user;

	useEffect(() => {
		setMounted(true);
	}, []);

	// 페이지 이동 시 모바일 메뉴 닫기
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	const navItems = [
		{ name: 'Chat', href: '/features/chat' },
		{ name: 'Characters', href: '/features/character' },
	];

	// NextAuth 규격에 맞춘 닉네임 파싱
	const getDisplayName = () => {
		if (!user) return '사용자';
		if (user.name) return user.name;
		if (user.email) return user.email.split('@')[0];
		return '사용자';
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b border-ui-border bg-ui-bg/80 backdrop-blur-md transition-colors duration-300">
			<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
				{/* 1. Left: 로고 */}
				<Link
					href="/"
					className="flex flex-col justify-center hover:opacity-80 transition-opacity cursor-pointer group"
				>
					<div className="flex items-center gap-2">
						<h1 className="text-lg font-bold tracking-tight text-ui-text-main">
							GEMINI <span className="text-brand-primary">AI</span>
						</h1>
					</div>
				</Link>

				{/* 2. Center: 데스크탑 네비게이션 */}
				<nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
					<ul className="flex items-center p-1.5 rounded-full bg-ui-bg border border-ui-border">
						{navItems.map((item) => {
							const isActive =
								item.href === '/'
									? pathname === '/'
									: pathname.startsWith(item.href);

							return (
								<li key={item.name}>
									<Link
										href={item.href}
										className={`block px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200
                                            ${
																							isActive
																								? 'bg-ui-card text-brand-primary shadow-sm ring-1 ring-ui-border'
																								: 'text-ui-text-muted hover:text-ui-text-main hover:bg-ui-card/50'
																						}
                                        `}
									>
										{item.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				{/* 3. Right: 유틸리티 버튼 */}
				<div className="flex items-center gap-2">
					{/* 테마 토글 */}
					<button
						onClick={toggleTheme}
						className="p-2 rounded-full hover:bg-ui-card transition-colors text-ui-text-muted hover:text-ui-text-main border border-transparent"
						aria-label="테마 변경"
					>
						{mounted ? (
							isDarkMode ? (
								<Moon size={20} />
							) : (
								<Sun size={20} />
							)
						) : (
							<div className="h-5 w-5" />
						)}
					</button>

					{/* 유저 상태 버튼 (로그인 / 프로필) */}
					{mounted && status !== 'loading' && (
						<div className="relative">
							{user ? (
								// 로그인 상태: 마이페이지 링크 (닉네임 + 프로필 이미지)
								<Link
									href="/features/user"
									className="flex items-center gap-2 p-1.5 rounded-full hover:bg-ui-card transition-all border border-transparent hover:border-ui-border group"
								>
									{/* <div className="flex items-center text-sm font-semibold text-ui-text-main">
										<span className="truncate max-w-[70px] sm:max-w-[100px]">
											{getDisplayName()}
										</span>
										<span className="whitespace-nowrap text-ui-text-muted ml-0.5">
											님
										</span>
									</div> */}

									{/* NextAuth의 프로필 이미지는 user.image 에 담겨 있습니다 */}
									{user.image ? (
										<Image
											src={user.image}
											alt="Profile"
											width={28}
											height={28}
											className="w-7 h-7 rounded-full object-cover shadow-sm group-hover:shadow"
										/>
									) : (
										<div className="w-7 h-7 rounded-full bg-ui-bg border border-ui-border flex items-center justify-center text-brand-primary">
											<User size={16} />
										</div>
									)}
								</Link>
							) : (
								// 비로그인 상태: 로그인 버튼
								<Link
									href="/features/login"
									className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-sm active:scale-95"
								>
									<LogIn
										size={16}
										strokeWidth={2.5}
									/>
									<span>로그인</span>
								</Link>
							)}
						</div>
					)}

					{/* 모바일 햄버거 메뉴 버튼 */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden p-2 rounded-full hover:bg-ui-card transition-colors text-ui-text-muted hover:text-ui-text-main border border-transparent"
						aria-label="메뉴 열기"
					>
						{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* 4. 모바일 네비게이션 메뉴 */}
			{isMobileMenuOpen && (
				<div className="md:hidden border-t border-ui-border bg-ui-bg/95 backdrop-blur-md">
					<ul className="flex flex-col p-4 space-y-2">
						{navItems.map((item) => {
							const isActive =
								item.href === '/'
									? pathname === '/'
									: pathname.startsWith(item.href);

							return (
								<li key={item.name}>
									<Link
										href={item.href}
										className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all
                                            ${
																							isActive
																								? 'bg-ui-bg text-brand-primary shadow-sm ring-1 ring-ui-border'
																								: 'text-ui-text-muted hover:bg-ui-card hover:text-ui-text-main'
																						}
                                        `}
									>
										{item.name}
									</Link>
								</li>
							);
						})}

						<li className="pt-3 mt-1 border-t border-ui-border">
							{user ? (
								<Link
									href="/features/user"
									className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-ui-text-main bg-ui-card/50 hover:bg-ui-card transition-all"
								>
									<User size={18} />
									마이페이지 ({getDisplayName()})
								</Link>
							) : (
								<Link
									href="/features/login"
									className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-brand-primary hover:opacity-90 transition-all shadow-sm"
								>
									<LogIn size={18} />
									로그인
								</Link>
							)}
						</li>
					</ul>
				</div>
			)}
		</header>
	);
}
