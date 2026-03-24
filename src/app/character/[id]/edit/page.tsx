import { auth } from '@/src/lib/auth';
import { redirect } from 'next/navigation';
import { getCharacterById } from '../../../../features/character/actions';
import CharacterForm from '../../../../features/character/components/CharacterForm';
import { ROUTES } from '@/src/constants/routes';

export default async function EditCharacterPage({
	params,
}: {
	params: { id: string };
}) {
	const session = await auth();
	if (!session?.user?.id) redirect(ROUTES.AUTH.LOGIN);

	const character = await getCharacterById(params.id);

	// 없는 캐릭터거나 본인의 캐릭터가 아니면 목록으로 튕겨냄
	if (!character || character.creatorId !== session.user.id) {
		redirect(ROUTES.CHARACTER.LIST);
	}

	return (
		<div className="min-h-screen bg-ui-bg text-ui-text-main p-8">
			<div className="max-w-3xl mx-auto space-y-8">
				<h1 className="text-3xl font-bold">캐릭터 수정: {character.name}</h1>
				<CharacterForm
					userId={session.user.id}
					initialData={character}
				/>
			</div>
		</div>
	);
}
