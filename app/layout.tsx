import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'New Blog',
    description: 'Next.js로 구현하는 인터랙티브 블로그 프로젝트',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ko'>
            <body>{children}</body>
        </html>
    );
}
