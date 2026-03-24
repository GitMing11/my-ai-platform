import { auth } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import ChatClient from '../../../features/chat/components/ChatClient';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/src/constants/routes';

export default async function ChatDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const session = await auth();

	if (!session || !session.user || !session.user.id) {
		console.error('유저 세션 또는 ID가 없습니다. 로그인 페이지로 이동합니다.');
		redirect(ROUTES.AUTH.LOGIN);
	}

	const currentUserId = session.user.id;
	const chatId = params.id;
	const currentChat = await prisma.chat.findFirst({
		where: {
			id: chatId,
			userId: session.user.id,
		},
	});

	if (!currentChat) {
		redirect(ROUTES.CHAT.ROOM); // 내 방이 아니면 대시보드로 쫓아내기
	}

	// 초기 데이터 서버사이드에서 호출
	const [chats, currentMessages] = await Promise.all([
		prisma.chat.findMany({
			where: { userId: currentUserId },
			orderBy: { updatedAt: 'desc' },
		}),
		prisma.message.findMany({
			where: { chatId: chatId },
			orderBy: { createdAt: 'asc' },
		}),
	]);

	// 보안 체크: 해당 채팅방이 존재하지 않거나 내 것이 아닐 경우
	if (!chats.some((c) => c.id === chatId)) {
		return redirect(ROUTES.CHAT.ROOM);
	}

	return (
		<div className="flex h-screen flex-col bg-ui-bg text-ui-text-main">
			<div className="flex flex-1 overflow-hidden">
				<ChatClient
					initialChats={chats}
					initialMessages={currentMessages}
					activeChatId={chatId}
					userId={currentUserId}
				/>
			</div>
		</div>
	);
}
