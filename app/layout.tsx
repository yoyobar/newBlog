import './globals.css';
import Header from '@/components/header/Header';
import Snowfall from '@/components/home/SnowFall';
import Dock from '@/components/home/Dock';
import Head from 'next/head';
import Provider from './Provider';

export const metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
            <Head>
                <meta lang='ko' />
                <meta charSet='UTF-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <title>{metadata.title}</title>
                <meta name='description' content={metadata.description} />
                <link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
                <link rel='manifest' href='/favicon/site.webmanifest' />
            </Head>
            <body
                style={{
                    backgroundImage: `url(/logo/main-bg.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className='fixed overflow-hidden w-full h-full bg-background'
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
