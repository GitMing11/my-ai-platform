'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCharacter, updateCharacter, deleteCharacter } from '../actions';

interface CharacterFormProps {
	userId: string;
	initialData?: any; // 수정 시에만 전달
}

export default function CharacterForm({
	userId,
	initialData,
}: CharacterFormProps) {
	const router = useRouter();
	const isEditMode = !!initialData;
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		name: initialData?.name || '',
		genre: initialData?.genre || '',
		personality: initialData?.personality || '',
		appearance: initialData?.appearance || '',
		speechStyle: initialData?.speechStyle || '',
		worldview: initialData?.worldview || '',
		isPublic: initialData?.isPublic || false,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value, type } = e.target;
		const checked =
			type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name) return alert('캐릭터 이름은 필수입니다.');

		setIsLoading(true);
		try {
			if (isEditMode) {
				await updateCharacter(initialData.id, formData);
			} else {
				await createCharacter(userId, formData);
			}
			router.push('/features/character');
			router.refresh();
		} catch (error) {
			console.error(error);
			alert('저장 중 오류가 발생했습니다.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async () => {
		if (!confirm('정말로 이 캐릭터를 삭제하시겠습니까?')) return;
		setIsLoading(true);
		try {
			await deleteCharacter(initialData.id);
			router.push('/features/character');
			router.refresh();
		} catch (error) {
			console.error(error);
			alert('삭제 중 오류가 발생했습니다.');
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 bg-ui-card border border-ui-border rounded-2xl p-6 md:p-8"
		>
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1 text-ui-text-muted">
						이름 (필수)
					</label>
					<input
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						className="w-full bg-ui-bg border border-ui-border rounded-xl p-3 focus:outline-none focus:border-brand-primary"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1 text-ui-text-muted">
						장르
					</label>
					<input
						name="genre"
						value={formData.genre}
						onChange={handleChange}
						placeholder="예: 판타지, 로맨스"
						className="w-full bg-ui-bg border border-ui-border rounded-xl p-3 focus:outline-none focus:border-brand-primary"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1 text-ui-text-muted">
						성격
					</label>
					<textarea
						name="personality"
						value={formData.personality}
						onChange={handleChange}
						rows={2}
						className="w-full bg-ui-bg border border-ui-border rounded-xl p-3 focus:outline-none focus:border-brand-primary resize-none"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1 text-ui-text-muted">
						외모
					</label>
					<textarea
						name="appearance"
						value={formData.appearance}
						onChange={handleChange}
						rows={2}
						className="w-full bg-ui-bg border border-ui-border rounded-xl p-3 focus:outline-none focus:border-brand-primary resize-none"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1 text-ui-text-muted">
						말투
					</label>
					<textarea
						name="speechStyle"
						value={formData.speechStyle}
						onChange={handleChange}
						rows={2}
						className="w-full bg-ui-bg border border-ui-border rounded-xl p-3 focus:outline-none focus:border-brand-primary resize-none"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1 text-ui-text-muted">
						세계관 및 스토리 배경
					</label>
					<textarea
						name="worldview"
						value={formData.worldview}
						onChange={handleChange}
						rows={3}
						className="w-full bg-ui-bg border border-ui-border rounded-xl p-3 focus:outline-none focus:border-brand-primary resize-none"
					/>
				</div>
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						name="isPublic"
						id="isPublic"
						checked={formData.isPublic}
						onChange={handleChange}
						className="w-4 h-4 rounded border-ui-border text-brand-primary focus:ring-brand-primary bg-ui-bg"
					/>
					<label
						htmlFor="isPublic"
						className="text-sm font-medium text-ui-text-muted"
					>
						다른 유저에게 공개하기
					</label>
				</div>
			</div>

			<div className="flex gap-4 pt-4 border-t border-ui-border">
				<button
					type="submit"
					disabled={isLoading}
					className="flex-1 bg-brand-primary text-white py-3 rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
				>
					{isLoading ? '저장 중...' : isEditMode ? '수정 완료' : '캐릭터 생성'}
				</button>
				{isEditMode && (
					<button
						type="button"
						onClick={handleDelete}
						disabled={isLoading}
						className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-6 py-3 rounded-xl font-medium transition-all"
					>
						삭제
					</button>
				)}
			</div>
		</form>
	);
}
