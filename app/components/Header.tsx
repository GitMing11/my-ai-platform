'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

export default function Header() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-ui-border bg-black/50 backdrop-blur-md">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-6">
					<Link
						href="/"
						className="text-xl font-bold tracking-tighter text-ui-text-main"
					>
						GEMINI <span className="text-brand-primary">AI</span>
					</Link>
					<nav className="hidden md:flex gap-4 text-sm font-medium text-ui-text-muted">
						<Link
							href="/chat"
							className="hover:text-ui-text-main transition-colors"
						>
							Chat
						</Link>
						<Link
							href="/characters"
							className="hover:text-ui-text-main transition-colors"
						>
							Characters
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<Link
						href="/login"
						className="rounded-full bg-ui-text-main px-4 py-1.5 text-sm font-semibold text-ui-bg hover:opacity-90 transition-opacity"
					>
						Get Started
					</Link>
				</div>
			</div>
		</header>
	);
}
