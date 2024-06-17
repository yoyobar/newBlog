import './globals.css';
import Header from '@/components/header/Header';
import Snowfall from '@/components/home/SnowFall';
import Dock from '@/components/home/Dock';
import Provider from './Provider';
import { Metadata, MetadataRoute } from 'next';
import localFont from 'next/font/local';

const pretendard = localFont({
    src: '../public/fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45, 920',
    variable: '--font-pretendard',
});

export const robots = (): MetadataRoute.Robots => {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://trouble-wiki.vercel.app/sitemap.xml',
    };
};

export const metadata: Metadata = {
    metadataBase: new URL('https://trouble-wiki.vercel.app/'),
    manifest: '/favicon/site.webmanifest',
    icons: {
        icon: [
            { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
        ],
    },

    title: `Trouble Wiki`,
    description: 'Trouble Wiki, 개인 블로그. 다양한 개발정보를 다룹니다.',
    keywords: ['자바스크립트, 타입스크립트, 개발블로그, 개발정보, 개발, js, ts, typescript, javascript, react, next.js'],
    creator: 'Minsu Kim',

    openGraph: {
        images: ['/logo/template_og.webp'],
        description: 'Trouble Wiki, 개인 블로그. 다양한 개발정보를 다룹니다.',
        type: 'article',
        authors: ['Minsu Kim', 'yoyobar'],
    },

    twitter: {
        card: 'summary_large_image',
        title: `Trouble Wiki`,
        description: 'Trouble Wiki, 개인 블로그. 다양한 개발정보를 다룹니다.',
        creator: 'yoyobar',
        images: ['/logo/template_og.webp'],
    },

    verification: {
        google: 'onSmWbcZS5c26LUgdJ5abeBG1dpO8frURYsfGxofS78',
        other: {
            'naver-site-verification': '7f959e68f00cadb5b2a462dd0bd29ceed877ad91',
        },
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='ko' suppressHydrationWarning className={`${pretendard.variable}`}>
            <body
                style={{
                    backgroundImage: `url(/logo/main-bg.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className={`${pretendard.className} fixed overflow-hidden w-full h-full bg-background`}
            >
                <Provider>
                    <Header />
                    {children}
                    <Snowfall />
                    <Dock />
                </Provider>
            </body>
        </html>
    );
}
