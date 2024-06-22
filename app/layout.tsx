import './globals.css';
import Header from '@/components/header/Header';
import Snowfall from '@/components/home/SnowFall';
import Dock from '@/components/home/Dock';
import Provider from './Provider';
import { Metadata, MetadataRoute } from 'next';
import localFont from 'next/font/local';
import { siteConfig } from '@/config/siteconfig';
import Script from 'next/script';

import useOptions from '@/config/store';
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

    alternates: {
        canonical: siteConfig.canonical,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='ko' suppressHydrationWarning className={`${pretendard.variable}`}>
            <body
                style={{
                    backgroundImage: `url(/img/main-bg.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className={`${pretendard.className} fixed overflow-hidden w-full h-full bg-background`}
            >
                <Provider>
                    <Analytics />
                    <Header />
                    {children}
                    <Snowfall />
                    <Dock />
                </Provider>
            </body>
        </html>
    );
}

export function Analytics() {
    return (
        <>
            {/* <!-- Google Tag Manager (noscript) --> */}
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=G-5ET7D32N8M`}
                    height='0'
                    width='0'
                    className='hidden invisible'
                ></iframe>
            </noscript>
            {/* <!-- End Google Tag Manager (noscript) --> */}
            {/* <!-- Google Tag Manager --> */}
            <Script id='google-tag-management'>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer',"G-5ET7D32N8M");
  
  `}</Script>
        </>
    );
}
