export const siteConfig = {
    url: 'https://trouble-wiki.vercel.app/',
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
        'trouble Wiki, 트러블 위키, 위키, 트러블위키, 자바스크립트, 타입스크립트, 개발블로그, 개발정보, 개발, js, ts, typescript, javascript, react, next.js',
    ],
    icons: {
        icon: [
            { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
        ],
    },
    since: 2024,

    openGraph: {
        url: 'https://trouble-wiki.vercel.app/',
        siteName: 'Trouble Wiki',
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
    canonical: 'https://trouble-wiki.vercel.app',
};
