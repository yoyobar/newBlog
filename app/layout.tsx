import './globals.css';
import Header from '@/components/header/Header';
import Dock from '@/components/home/Dock';
import Provider from './Provider';
import { Metadata, MetadataRoute } from 'next';
import localFont from 'next/font/local';
import { siteConfig } from '@/config/siteconfig';
import { Suspense } from 'react';
import Analytic from './Analytics';

const pretendard = localFont({
    src: '../public/fonts/PretendardVariable.woff2',
    display: 'swap',
    variable: '--font-pretendard',
});

export const robots = (): MetadataRoute.Robots => {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://wiki.yoyobar.xyz/sitemap.xml',
    };
};

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    manifest: siteConfig.manifest,
    icons: siteConfig.icons,
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    creator: siteConfig.author.creator,
    openGraph: siteConfig.openGraph,
    twitter: siteConfig.twitter,
    verification: siteConfig.verification,

    alternates: {
        canonical: siteConfig.canonical,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" suppressHydrationWarning className={`${pretendard.variable}`}>
            <body
                className={`${pretendard.className} fixed bg-cover bg-center overflow-hidden w-full h-full bg-dark bg-background`}
            >
                <Suspense>
                    <Analytic />
                </Suspense>
                <Provider>
                    <Header />
                    {children}
                    <Dock />
                </Provider>
            </body>
        </html>
    );
}
