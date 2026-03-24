// src/app/chat/page.tsx
import { getChats } from '@/src/features/chat/actions';
import { auth } from '@/src/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/src/constants/routes';
import { MessageSquare, Plus, Clock } from 'lucide-react';

export default async function ChatDashboardPage() {
	const session = await auth();

	if (!session || !session.user || !session.user.id) {
		console.error('유저 세션 또는 ID가 없습니다. 로그인 페이지로 이동합니다.');
		redirect(ROUTES.AUTH.LOGIN);
	}

	const chats = await getChats(session?.user?.id || '');

	return (
		<div className="mx-auto max-w-5xl px-4 py-10">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-ui-text-main">
						채팅 대시보드
					</h1>
					<p className="text-ui-text-muted">
						이전에 나누었던 이야기들을 확인하세요.
					</p>
				</div>
				<Link
					href={ROUTES.CHAT.NEW} // 새로운 채팅 생성 로직으로 연결
					className="flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-2.5 text-brand-contrast hover:opacity-90 transition-all"
				>
					<Plus size={20} />새 채팅 시작
				</Link>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{chats.map((chat) => (
					<Link
						key={chat.id}
						href={`${ROUTES.CHAT.ROOM}/${chat.id}`} // 개별 채팅방 이동
						className="group relative rounded-2xl border border-ui-border bg-ui-card p-5 hover:border-brand-primary/50 transition-all"
					>
						<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
							<MessageSquare size={20} />
						</div>
						<h3 className="mb-1 font-semibold text-ui-text-main truncate">
							{chat.title || '새로운 대화'}
						</h3>
						<div className="flex items-center gap-2 text-xs text-ui-text-dim">
							<Clock size={12} />
							{new Date(chat.updatedAt).toLocaleDateString()}
						</div>
					</Link>
				))}

				{chats.length === 0 && (
					<div className="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-ui-border rounded-2xl">
						<p className="text-ui-text-muted">아직 생성된 대화가 없습니다.</p>
					</div>
				)}
			</div>
		</div>
	);
}
