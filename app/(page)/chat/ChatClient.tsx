'use client';

import { useState } from 'react';

export default function ChatClient({
	initialChats,
	userId,
}: {
	initialChats: any[];
	userId: string;
}) {
	const [chats] = useState(initialChats);
	const [activeChatId, setActiveChatId] = useState<string | null>(
		initialChats[0]?.id || null,
	);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// 대화 내역 상태 관리
	const [messages, setMessages] = useState<
		{ role: 'user' | 'assistant'; content: string }[]
	>([
		{
			role: 'assistant',
			content:
				'새로운 프로젝트에 오신 것을 환영합니다! 어떤 애니메이션 스타일의 캐릭터를 만들어볼까요? 외형, 성격, 세계관 등을 자유롭게 알려주세요.',
		},
	]);

	// 메시지 전송 로직
	const handleSendMessage = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage = input.trim();
		setInput(''); // 입력창 초기화

		// 유저 메시지를 화면에 먼저 추가
		setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
		setIsLoading(true);

		try {
			// API Route로 메시지 전송
			const response = await fetch('/api/ai', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: userMessage }),
			});

			if (!response.ok) throw new Error('API 요청에 실패했습니다.');

			const data = await response.json();

			// AI 응답을 화면에 추가
			setMessages((prev) => [
				...prev,
				{ role: 'assistant', content: data.result },
			]);
		} catch (error) {
			console.error(error);
			setMessages((prev) => [
				...prev,
				{
					role: 'assistant',
					content:
						'응답을 받아오는 데 문제가 발생했습니다. 다시 시도해 주세요.',
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	// 엔터키 전송 지원 (Shift+Enter는 줄바꿈)
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<>
			{/* 사이드바: 대화 리스트 */}
			{/* 기존 bg-black/20 -> bg-ui-card/50 변경하여 테마 연동 */}
			<aside className="hidden w-72 flex-col border-r border-ui-border bg-ui-card/50 md:flex">
				<div className="p-4">
					{/* 기존 hover:bg-white/5 -> hover:bg-ui-border/50 변경 */}
					<button className="w-full rounded-xl border border-ui-border bg-ui-card py-2.5 text-sm font-medium hover:bg-ui-border/50 transition-all text-ui-text-main">
						+ 새로운 스토리 시작
					</button>
				</div>
				<nav className="flex-1 overflow-y-auto p-2 space-y-1">
					{chats.map((chat) => (
						<div
							key={chat.id}
							onClick={() => setActiveChatId(chat.id)}
							className={`rounded-lg px-4 py-3 text-sm cursor-pointer transition-all ${
								activeChatId === chat.id
									? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
									: 'text-ui-text-muted hover:bg-ui-border/50'
							}`}
						>
							{chat.title || '새로운 대화'}
						</div>
					))}
				</nav>
			</aside>

			{/* 메인 채팅창 */}
			<main className="flex flex-1 flex-col relative bg-ui-bg">
				{/* CSS 변수를 직접 활용한 배경 그라데이션 (정상 작동) */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--color-brand-primary)_0%,transparent_50%)] opacity-5 pointer-events-none" />

				{/* 메시지 영역 */}
				<div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
					<div className="mx-auto max-w-3xl space-y-6">
						{/* 메시지 렌더링 맵 */}
						{messages.map((msg, idx) => (
							<div
								key={idx}
								className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
							>
								<div
									className={`max-w-[85%] rounded-2xl p-5 text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
										msg.role === 'user'
											? 'bg-brand-primary text-white rounded-tr-none shadow-md' // 유저 메시지는 강조되도록 white 유지
											: 'bg-ui-card border border-ui-border rounded-tl-none font-light text-ui-text-main shadow-sm' // text-zinc-200 -> text-ui-text-main 변경
									}`}
								>
									{msg.content}
								</div>
							</div>
						))}

						{/* 로딩 표시 (생성 중) */}
						{isLoading && (
							<div className="flex justify-start">
								<div className="max-w-[85%] rounded-2xl p-5 text-sm md:text-base bg-ui-card border border-ui-border rounded-tl-none font-light text-ui-text-muted animate-pulse">
									{/* text-zinc-400 -> text-ui-text-muted 변경 */}
									답변을 생성하고 있습니다...
								</div>
							</div>
						)}
					</div>
				</div>

				{/* 입력창 구역 */}
				<div className="p-4 md:p-8 bg-linear-to-t from-ui-bg via-ui-bg to-transparent">
					<div className="mx-auto max-w-3xl relative">
						<textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="메시지를 입력하세요... (Enter로 전송, Shift+Enter로 줄바꿈)"
							className="w-full resize-none rounded-2xl border border-ui-border bg-ui-card/80 p-5 pr-16 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary backdrop-blur-sm transition-all text-ui-text-main"
							rows={2}
							disabled={isLoading}
						/>
						<button
							onClick={handleSendMessage}
							disabled={isLoading || !input.trim()}
							className="absolute right-4 bottom-5 rounded-xl bg-brand-primary p-2.5 text-white hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:active:scale-100"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line
									x1="22"
									y1="2"
									x2="11"
									y2="13"
								></line>
								<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
							</svg>
						</button>
					</div>
					<p className="mt-3 text-center text-[11px] text-ui-text-dim tracking-tight">
						AI 에이전트와 대화 중입니다. 모든 스토리는 안전하게 암호화되어
						보관됩니다.
					</p>
				</div>
			</main>
		</>
	);
}
