import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import Header from '../components/layout/Header';
import AuthProvider from '../components/providers/AuthProvider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'AI Platform',
	description: 'Your Private AI Agent',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body>
				<AuthProvider>
					<ThemeProvider>
						<Header />
						{children}
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
