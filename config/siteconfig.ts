import { CDN } from './const';

export const siteConfig = {
    url: 'https://wiki.yoyobar.xyz/',
    manifest: '/favicon/site.webmanifest',
    author: {
        name: 'yoyobar',
        contacts: {
            email: 'barwait@naver.com',
        },
        creator: 'Minsu Kim',
    },
    title: 'Trouble Wiki',
    description: 'Trouble Wiki, 개인 블로그. 다양한 개발정보를 다룹니다.',
    keywords: [
        'tech blog, blog, 위키, 트러블위키, 자바스크립트, 타입스크립트, 개발블로그, 개발정보, 개발, js, ts, typescript, javascript, react, next.js',
    ],
    icons: {
        icon: [
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                url: '/favicon/apple-touch-icon.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                url: '/favicon/favicon-32x32.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                url: '/favicon/favicon-16x16.png',
            },
        ],
    },
    since: 2024,

    openGraph: {
        url: 'https://wiki.yoyobar.xyz/',
        siteName: 'Trouble Wiki',
        images: [CDN + '/img/template_og_main.webp'],
        description: 'Trouble Wiki, 개인 블로그. 다양한 개발정보를 다룹니다.',
        type: 'article',
        authors: ['Minsu Kim', 'yoyobar'],
    },
    twitter: {
        card: 'summary_large_image',
        title: `Trouble Wiki`,
        description: 'Trouble Wiki, 개인 블로그. 다양한 개발정보를 다룹니다.',
        creator: 'yoyobar',
        images: [CDN + '/img/template_og_main.webp'],
    },
    verification: {
        google: 'B3igpFq97OplLTa0FIJ1j8QW7m9HrV7ka8mYWKu9Yqc',
        other: {
            'naver-site-verification': 'b1514dfdd78160c51b2a92ab8a32a656e2d92ce7',
        },
    },
    canonical: 'https://wiki.yoyobar.xyz/',
};
