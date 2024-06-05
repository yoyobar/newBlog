import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/Header';
import Snowfall from '@/components/home/SnowFall';
import Dock from '@/components/home/Dock';

export const metadata: Metadata = {
    title: 'Trouble Wiki',
    description: 'Next.js로 구현하는 인터랙티브 블로그 프로젝트',
    icons: {
        icon: [
            { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
        ],
    },
    manifest: '/favicon/site.webmanifest',
};

export const viewport = {
    themeColor: '#000000',
    msapplication: {
        TileColor: '#2b5797',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ko'>
            <body
                style={{
                    backgroundImage: `url(/logo/main-bg.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className='fixed overflow-hidden w-full h-full bg-background'
            >
                <Header />
                {children}
                <Snowfall />
                <Dock />
            </body>
        </html>
    );
}
