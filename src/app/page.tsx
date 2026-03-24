export default function Home() {
	return (
		<div className="flex min-h-screen flex-col bg-ui-bg text-ui-text-main">
			<main className="flex-1">
				{/* Hero Section */}
				<section className="relative flex flex-col items-center justify-center px-4 py-32 text-center">
					{/* Radial Gradient - 브랜드 컬러 활용 */}
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-brand-primary)_0%,transparent_70%)] opacity-15 -z-10" />

					<h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
						Next Generation <br />
						<span className="bg-linear-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
							AI Chat Platform
						</span>
					</h1>

					<p className="mb-10 max-w-160 text-ui-text-muted sm:text-xl leading-relaxed">
						더 빠르고 스마트한 업무를 위한 프라이빗 AI 에이전트.
						<br />
						최신 LLM 모델을 통해 제한 없는 대화와 생산성을 경험하세요.
					</p>

					<div className="flex flex-wrap justify-center gap-6">
						{/* Feature Card 1: AI Chat */}
						<div className="group rounded-2xl border border-ui-border bg-ui-card p-8 backdrop-blur-sm w-72 text-left hover:border-brand-primary/50 transition-all">
							<h3 className="text-xl font-bold mb-3 text-brand-primary">
								Advanced Chat
							</h3>
							<p className="text-sm text-ui-text-dim leading-relaxed">
								복잡한 질문에도 명확한 해답을 제시하는 지능형 대화 엔진을
								경험하세요.
							</p>
						</div>

						{/* Feature Card 2: AI Tools */}
						<div className="group rounded-2xl border border-ui-border bg-ui-card p-8 backdrop-blur-sm w-72 text-left hover:border-brand-secondary/50 transition-all">
							<h3 className="text-xl font-bold mb-3 text-brand-secondary">
								Smart Tools
							</h3>
							<p className="text-sm text-ui-text-dim leading-relaxed">
								이미지 생성부터 텍스트 분석까지, 플랫폼 하나로 모든 작업이
								가능합니다.
							</p>
						</div>
					</div>
				</section>

				{/* Feature Section Preview */}
				<section className="container mx-auto px-4 py-24 border-t border-ui-border">
					<div className="grid gap-16 md:grid-cols-2 items-center">
						<div className="space-y-6">
							<h2 className="text-4xl font-bold tracking-tight">
								Access Control
							</h2>
							<p className="text-lg text-ui-text-muted leading-relaxed">
								개별 인증 코드를 통한 프라이빗 가입 시스템을 제공합니다.
								<br />
								검증된 사용자들만을 위한 고성능 AI 환경에서 안심하고 대화하세요.
							</p>
						</div>
						<div className="aspect-video rounded-2xl bg-ui-card border border-ui-border flex items-center justify-center text-ui-text-dim shadow-2xl">
							<span className="font-mono text-sm tracking-widest uppercase">
								System Dashboard Interface
							</span>
						</div>
					</div>
				</section>
			</main>

			<footer className="border-t border-ui-border py-12 text-center text-sm text-ui-text-dim">
				<p>© 2026 AI Platform Project. Built for Productivity.</p>
			</footer>
		</div>
	);
}
