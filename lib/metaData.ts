import * as Icon from './IconData';

interface metaType {
    [key: string]: {
        icon: () => JSX.Element;
        boxClass?: string;
        title: string;
    };
}

export const metaStyle = {
    header: 'text-5xl',
    all: 'text-sky-400',
    html: 'text-[#E34F26]',
    css: 'text-[#1572B6]',
    js: 'text-[#F7DF1E]',
    ts: 'text-[#3178C6]',
    react: 'text-[#61DAFB]',
    redux: 'text-[#764ABC]',
};

export const metadata: metaType = {
    default: {
        icon: Icon.Default,
        title: 'ETC',
    },
    all: {
        icon: Icon.All,
        boxClass: metaStyle.all,
        title: '전체 게시글',
    },
    js: {
        icon: Icon.Js,
        boxClass: metaStyle.js,
        title: '자바 스크립트',
    },
    ts: {
        icon: Icon.Ts,
        boxClass: metaStyle.ts,
        title: '타입 스크립트',
    },
    react: {
        icon: Icon.React,
        boxClass: metaStyle.react,
        title: '리액트',
    },
    css: {
        icon: Icon.Css,
        boxClass: metaStyle.css,
        title: 'CSS',
    },
    html: {
        icon: Icon.Html,
        boxClass: metaStyle.html,
        title: 'HTML',
    },
    redux: {
        icon: Icon.Redux,
        boxClass: metaStyle.redux,
        title: 'Redux',
    },
};
