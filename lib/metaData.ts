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
    all: 'text-sky-400',
    html: 'text-[#E34F26]',
    css: 'text-[#1572B6]',
    js: 'text-[#F7DF1E]',
    ts: 'text-[#3178C6]',
    react: 'text-[#61DAFB]',
    redux: 'text-[#764ABC]',
    archive: 'text-sky-500',
};

export const metadata: metaType = {
    default: {
        icon: Icon.Default,
        title: 'ETC',
        link: '',
        visible: false,
    },
    all: {
        icon: Icon.All,
        boxClass: metaStyle.all,
        title: '전체',
        link: '',
        visible: true,
    },
    js: {
        icon: Icon.Js,
        boxClass: metaStyle.js,
        title: '자바 스크립트',
        link: 'js',
        visible: true,
    },
    ts: {
        icon: Icon.Ts,
        boxClass: metaStyle.ts,
        title: '타입 스크립트',
        link: 'ts',
        visible: true,
    },
    react: {
        icon: Icon.React,
        boxClass: metaStyle.react,
        title: '리액트',
        link: 'react',
        visible: true,
    },
    css: {
        icon: Icon.Css,
        boxClass: metaStyle.css,
        title: 'CSS',
        link: 'css',
        visible: true,
    },
    html: {
        icon: Icon.Html,
        boxClass: metaStyle.html,
        title: 'HTML',
        link: 'html',
        visible: true,
    },
    redux: {
        icon: Icon.Redux,
        boxClass: metaStyle.redux,
        title: 'Redux',
        link: 'redux',
        visible: true,
    },
    archive: {
        icon: Icon.Archive,
        boxClass: metaStyle.archive,
        title: 'Archives',
        link: 'archives',
        visible: true,
    },
};

export const getMetadataValues = () => {
    return Object.keys(metadata).map((key) => {
        const { title, link, visible } = metadata[key];
        return { key, title, link, visible };
    });
};
