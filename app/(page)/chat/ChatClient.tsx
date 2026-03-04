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

	return (
		<>
			{/* 사이드바: 대화 리스트 */}
			<aside className="hidden w-72 flex-col border-r border-ui-border bg-black/20 md:flex">
				<div className="p-4">
					<button className="w-full rounded-xl border border-ui-border bg-ui-card py-2.5 text-sm font-medium hover:bg-white/5 transition-all">
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
									: 'text-ui-text-muted hover:bg-white/5'
							}`}
						>
							{chat.title || '새로운 대화'}
						</div>
					))}
				</nav>
			</aside>

			{/* 메인 채팅창 */}
			<main className="flex flex-1 flex-col relative bg-ui-bg">
				{/* 상단 배경 그라데이션 (몰입감 증대) */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--color-brand-primary)_0%,transparent_50%)] opacity-5 pointer-events-none" />

				{/* 메시지 영역 */}
				<div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
					<div className="mx-auto max-w-3xl space-y-6">
						{/* 데이터가 없을 때 표시할 안내 */}
						{chats.length === 0 && (
							<div className="text-center py-20">
								<h2 className="text-2xl font-bold text-brand-primary mb-2">
									당신의 이야기가 시작됩니다
								</h2>
								<p className="text-ui-text-muted text-sm">
									첫 메시지를 입력하여 스토리를 진행하세요.
								</p>
							</div>
						)}

						{/* 예시 메시지 렌더링 (실제 구현 시 선택된 채팅의 메시지 매핑) */}
						<div className="flex justify-start">
							<div className="max-w-[85%] rounded-2xl p-5 text-sm md:text-base leading-relaxed bg-ui-card border border-ui-border rounded-tl-none font-light text-zinc-200">
								어두운 안개 속에서 누군가 당신의 이름을 부릅니다...
							</div>
						</div>
					</div>
				</div>

				{/* 입력창 구역 */}
				<div className="p-4 md:p-8 bg-linear-to-t from-ui-bg via-ui-bg to-transparent">
					<div className="mx-auto max-w-3xl relative">
						<textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="이야기를 이어가세요..."
							className="w-full resize-none rounded-2xl border border-ui-border bg-ui-card/80 p-5 pr-16 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary backdrop-blur-sm transition-all text-ui-text-main"
							rows={2}
						/>
						<button className="absolute right-4 bottom-5 rounded-xl bg-brand-primary p-2.5 text-white hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-brand-primary/20">
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
