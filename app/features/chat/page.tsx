import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ChatClient from './ChatClient';
import { redirect } from 'next/navigation';

export default async function ChatPage() {
	const session = await auth();

	if (!session || !session.user || !session.user.id) {
		console.error('유저 세션 또는 ID가 없습니다. 로그인 페이지로 이동합니다.');
		redirect('/features/login');
	}

	const currentUserId = session.user.id;

	// 초기 데이터 서버사이드에서 호출
	const chats = await prisma.chat.findMany({
		where: { userId: session.user.id! },
		orderBy: { updatedAt: 'desc' },
	});

	return (
		<div className="flex h-screen flex-col bg-ui-bg text-ui-text-main">
			<div className="flex flex-1 overflow-hidden">
				<ChatClient
					initialChats={chats}
					userId={currentUserId}
				/>
			</div>
		</div>
	);
}
