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
    dev: 'text-rose-400',
};

export const metadata: metaType = {
    blogs: {
        icon: Icon.All,
        boxClass: metaStyle.default,
        title: '전체',
        link: '/posts',
        visible: true,
    },
    Javascript_basic: {
        icon: Icon.Js,
        boxClass: metaStyle.js,
        title: '자바 스크립트 기초',
        link: '/posts/Javascript_basic',
        visible: true,
    },
    Javascript_advance: {
        icon: Icon.Js,
        boxClass: metaStyle.js,
        title: '자바 스크립트 심화',
        link: '/posts/Javascript_advance',
        visible: false,
    },
    Typescript: {
        icon: Icon.Ts,
        boxClass: metaStyle.ts,
        title: '타입 스크립트',
        link: '/posts/Typescript',
        visible: true,
    },
    React: {
        icon: Icon.React,
        boxClass: metaStyle.react,
        title: '리액트',
        link: '/posts/React',
        visible: true,
    },
    State_Management: {
        icon: Icon.React,
        boxClass: metaStyle.react,
        title: '전역 상태 관리',
        link: '/posts/State_Management',
        visible: true,
    },
    Project: {
        icon: Icon.Archives,
        boxClass: metaStyle.react,
        title: '프로젝트',
        link: '/posts/Project',
        visible: true,
    },
    Dev: {
        icon: Icon.Dev,
        boxClass: metaStyle.dev,
        title: '개발',
        link: '/posts/Dev',
        visible: true,
    },
};

export const getMetadataValues = () => {
    return Object.keys(metadata).map((key) => {
        const { title, link, visible } = metadata[key];
        return { key, title, link, visible };
    });
};
