import { auth } from '@/src/lib/auth';
import { redirect } from 'next/navigation';
import { getCharacters } from '../../features/character/actions';
import Link from 'next/link';
import { ROUTES } from '@/src/constants/routes';

export default async function CharacterListPage() {
	const session = await auth();
	if (!session?.user?.id) redirect(ROUTES.AUTH.LOGIN);

	const characters = await getCharacters(session.user.id);

	return (
		<div className="min-h-screen bg-ui-bg text-ui-text-main p-8">
			<div className="max-w-4xl mx-auto space-y-8">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold">내 캐릭터 목록</h1>
					<Link
						href={ROUTES.CHARACTER.NEW}
						className="bg-brand-primary text-white px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-all"
					>
						+ 새 캐릭터 만들기
					</Link>
				</div>

				{characters.length === 0 ? (
					<div className="text-center py-20 bg-ui-card border border-ui-border rounded-2xl text-ui-text-muted">
						아직 생성된 캐릭터가 없습니다. 첫 캐릭터를 만들어보세요!
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{characters.map((char) => (
							<div
								key={char.id}
								className="bg-ui-card border border-ui-border rounded-2xl p-5 hover:border-brand-primary/50 transition-all"
							>
								<h2 className="text-xl font-bold mb-2">{char.name}</h2>
								<p className="text-sm text-ui-text-muted line-clamp-2 mb-4">
									{char.genre && (
										<span className="text-brand-primary text-xs bg-brand-primary/10 px-2 py-1 rounded-md mr-2">
											{char.genre}
										</span>
									)}
									{char.personality || '성격 설정이 없습니다.'}
								</p>
								<div className="flex gap-2">
									<Link
										href={ROUTES.CHARACTER.EDIT(char.id)}
										className="flex-1 text-center bg-ui-border/50 hover:bg-ui-border text-sm py-2 rounded-lg transition-all"
									>
										수정
									</Link>
									{/* 추후 이곳에 '이 캐릭터와 대화하기' 버튼을 추가할 수 있습니다. */}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
