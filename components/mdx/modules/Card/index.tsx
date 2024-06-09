import Link from 'next/link';
import * as Icon from './CardIcon';
import { PropsWithChildren } from 'react';

type CardType = 'Default' | 'js' | 'ts' | 'react' | 'redux' | 'css' | 'html';

interface CardProps extends PropsWithChildren {
  icon?: CardType;
  href: string;
  title: string;
}

interface IconType {
  [key: string]: {
    icon: () => JSX.Element;
    boxClass?: string;
  };
}

const metaStyle = {
  default: '',
  html: 'text-[#E34F26]',
  css: 'text-[#1572B6]',
  js: 'text-[#F7DF1E]',
  ts: 'text-[#3178C6]',
  react: 'text-[#61DAFB]',
  redux: 'text-[#764ABC]',
};

const metadata: IconType = {
  default: {
    icon: Icon.Default,
  },
  js: {
    icon: Icon.Js,
    boxClass: metaStyle.js,
  },
  ts: {
    icon: Icon.Ts,
    boxClass: metaStyle.ts,
  },
  react: {
    icon: Icon.React,
    boxClass: metaStyle.react,
  },
  css: {
    icon: Icon.Css,
    boxClass: metaStyle.css,
  },
  html: {
    icon: Icon.Html,
    boxClass: metaStyle.html,
  },
  redux: {
    icon: Icon.Redux,
    boxClass: metaStyle.redux,
  },
};

export const Cards = ({ children }: { children: React.ReactNode }) => {
  return <div className="block md:grid md:grid-cols-3 gap-8 ">{children}</div>;
};

export const Card = (props: CardProps) => {
  const type = props.icon || 'default';
  const metaObj = metadata[type];
  const Icon = metaObj.icon;
  const boxClassName = metaObj.boxClass;

  return (
    <Link
      className="border-2 border-black mt-8 dark:border-stone-500 dark:hover:border-stone-100 hover:border-indigo-600 transition-all  block no-underline p-8 rounded-md w-full"
      href={props.href}
    >
      <div className="flex items-center gap-4">
        <div className={`${boxClassName} ${metaStyle.default}`}>
          <Icon />
        </div>
        {props.title}
      </div>
    </Link>
  );
};
