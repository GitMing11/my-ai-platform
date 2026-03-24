'use client';

import { useState } from 'react';
import { saveMessage, createChat, getMessages } from './actions';
import { AI_PROMPTS } from '@/lib/ai/prompts';
import { ChatListItem } from '@/types/chat';

export default function ChatClient({
	initialChats,
	userId,
}: {
	initialChats: ChatListItem[];
	userId: string;
}) {
	const [chats, setChats] = useState<ChatListItem[]>(initialChats);
	const [activeChatId, setActiveChatId] = useState<string | null>(
		initialChats[0]?.id || null,
	);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [messages, setMessages] = useState<
		{ role: 'user' | 'assistant'; content: string }[]
	>([
		{
			role: 'assistant',
			content: AI_PROMPTS.greeting,
		},
	]);

	// 새로운 대화방 생성 로직
	const handleCreateChat = async () => {
		setIsLoading(true);
		try {
			// actions.ts에 추가하신 characterId 파라미터가 필요합니다.
			// 현재는 임시값('default-character')을 넣었으며, 추후 캐릭터 선택 로직과 연동하세요.
			const newChat = await createChat(
				userId,
				'default-character',
				'새로운 대화',
			);

			setChats((prev) => [newChat, ...prev]); // 사이드바 목록 최상단에 추가
			setActiveChatId(newChat.id); // 활성화된 채팅방 변경
			setMessages([{ role: 'assistant', content: AI_PROMPTS.greeting }]); // 메시지 초기화
		} catch (error) {
			console.error('채팅방 생성 에러:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// 기존 대화방 클릭 시 과거 메시지 불러오기 로직
	const handleSelectChat = async (chatId: string) => {
		if (chatId === activeChatId) return; // 이미 선택된 방이면 무시

		setActiveChatId(chatId);
		setIsLoading(true);

		try {
			const pastMessages = await getMessages(chatId);
			if (pastMessages.length > 0) {
				// DB 구조(MessageRole)에 맞춰 타입 변환 후 세팅
				setMessages(
					pastMessages.map((m) => ({
						role: m.role === 'user' ? 'user' : 'assistant',
						content: m.content,
					})),
				);
			} else {
				setMessages([{ role: 'assistant', content: AI_PROMPTS.greeting }]);
			}
		} catch (error) {
			console.error('메시지 불러오기 에러:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// 메시지 전송 로직
	const handleSendMessage = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage = input.trim();
		setInput(''); // 입력창 초기화

		// 유저 메시지를 화면에 먼저 추가
		setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
		setIsLoading(true);

		// ※ 방이 없을 경우 전송 시점에 자동 생성하는 로직
		let currentChatId = activeChatId;
		if (!currentChatId) {
			const newChat = await createChat(
				userId,
				'default-character',
				'새로운 대화',
			);
			setChats((prev) => [newChat, ...prev]);
			setActiveChatId(newChat.id);
			currentChatId = newChat.id;
		}

		try {
			// 유저 메시지를 DB에 저장
			await saveMessage(currentChatId, 'user', userMessage);

			// AI 응답 요청
			const response = await fetch('/api/ai', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: userMessage }),
			});

			if (!response.ok) throw new Error('API 요청에 실패했습니다.');

			const data = await response.json();
			const aiMessage = data.result;

			// AI 응답을 화면에 추가
			setMessages((prev) => [
				...prev,
				{ role: 'assistant', content: aiMessage },
			]);

			// AI 응답을 DB에 저장
			await saveMessage(currentChatId, 'assistant', aiMessage);
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
			<aside className="hidden w-72 flex-col border-r border-ui-border bg-ui-card/50 md:flex">
				<div className="p-4">
					<button
						onClick={handleCreateChat}
						disabled={isLoading}
						className="w-full rounded-xl border border-ui-border bg-ui-card py-2.5 text-sm font-medium hover:bg-ui-border/50 transition-all text-ui-text-main disabled:opacity-50"
					>
						+ 새로운 스토리 시작
					</button>
				</div>
				<nav className="flex-1 overflow-y-auto p-2 space-y-1">
					{chats.map((chat) => (
						<div
							key={chat.id}
							onClick={() => handleSelectChat(chat.id)}
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
											? 'bg-brand-primary text-brand-contrast rounded-tr-none shadow-md'
											: 'bg-ui-card border border-ui-border rounded-tl-none font-light text-ui-text-main shadow-sm'
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
							className="absolute right-4 bottom-5 rounded-xl bg-brand-primary p-2.5 text-brand-contrast hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:active:scale-100"
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
