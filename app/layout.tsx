import './globals.css';
import Header from '@/components/header/Header';
import Snowfall from '@/components/home/SnowFall';
import Dock from '@/components/home/Dock';
import Provider from './Provider';
import { Metadata, MetadataRoute } from 'next';
import localFont from 'next/font/local';
import { siteConfig } from '@/config/siteconfig';
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
