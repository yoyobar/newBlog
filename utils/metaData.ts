import * as Icon from './IconData';

interface metaType {
    [key: string]: {
        icon: () => JSX.Element;
        boxClass?: string;
        title: string;
        link: string;
        visible: boolean;
    };
}

export const metaStyle = {
    archives: 'text-sky-400',
    default: 'text-sky-400',
    html: 'text-[#E34F26]',
    css: 'text-[#1572B6]',
    js: 'text-[#F7DF1E]',
    ts: 'text-[#3178C6]',
    react: 'text-[#61DAFB]',
    redux: 'text-[#764ABC]',
    setting: 'text-gray-400',
    dev: 'text-rose-400',
};

export const metadata: metaType = {
    default: {
        icon: Icon.All,
        title: 'ETC',
        link: '/posts',
        visible: false,
    },
    all: {
        icon: Icon.All,
        boxClass: metaStyle.default,
        title: '전체',
        link: '/posts',
        visible: true,
    },
    js: {
        icon: Icon.Js,
        boxClass: metaStyle.js,
        title: '자바 스크립트',
        link: '/posts/js',
        visible: true,
    },
    ts: {
        icon: Icon.Ts,
        boxClass: metaStyle.ts,
        title: '타입 스크립트',
        link: '/posts/ts',
        visible: true,
    },
    react: {
        icon: Icon.React,
        boxClass: metaStyle.react,
        title: '리액트',
        link: '/posts/react',
        visible: true,
    },
    dev: {
        icon: Icon.Dev,
        boxClass: metaStyle.dev,
        title: '개발',
        link: '/posts/dev',
        visible: true,
    },
    archives: {
        icon: Icon.Archives,
        boxClass: metaStyle.archives,
        title: 'Archives',
        link: '/archives',
        visible: true,
    },
    book: {
        icon: Icon.Book,
        boxClass: metaStyle.default,
        title: 'Book',
        link: '/book',
        visible: true,
    },
    setting: {
        icon: Icon.Setting,
        boxClass: metaStyle.setting,
        title: 'Setting',
        link: '/setting',
        visible: true,
    },
};

export const getMetadataValues = () => {
    return Object.keys(metadata).map((key) => {
        const { title, link, visible } = metadata[key];
        return { key, title, link, visible };
    });
};
