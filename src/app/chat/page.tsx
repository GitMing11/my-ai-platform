import { auth } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import ChatClient from '../../features/chat/components/ChatClient';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/src/constants/routes';

export default async function ChatPage() {
	const session = await auth();

	if (!session || !session.user || !session.user.id) {
		console.error('유저 세션 또는 ID가 없습니다. 로그인 페이지로 이동합니다.');
		redirect(ROUTES.AUTH.LOGIN);
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
