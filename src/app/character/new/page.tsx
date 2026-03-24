import { auth } from '@/src/lib/auth';
import { redirect } from 'next/navigation';
import CharacterForm from '../../../features/character/components/CharacterForm';
import { ROUTES } from '@/src/constants/routes';

export default async function NewCharacterPage() {
	const session = await auth();
	if (!session?.user?.id) redirect(ROUTES.AUTH.LOGIN);

	return (
		<div className="min-h-screen bg-ui-bg text-ui-text-main p-8">
			<div className="max-w-3xl mx-auto space-y-8">
				<h1 className="text-3xl font-bold">새 캐릭터 만들기</h1>
				<CharacterForm userId={session.user.id} />
			</div>
		</div>
	);
}
