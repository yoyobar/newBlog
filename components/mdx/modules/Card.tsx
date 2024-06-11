import Link from 'next/link';
import { metadata } from '@/lib/metaData';
import { PropsWithChildren } from 'react';

export interface CardProps extends PropsWithChildren {
    icon?: string;
    href?: string;
    title: string;
}

export const Cards = ({ children }: { children: React.ReactNode }) => {
    return <div className='block 2xl:grid 2xl:grid-cols-2 3xl:grid-cols-3 gap-8 '>{children}</div>;
};

export const Card = (props: CardProps) => {
    const type = props.icon || 'default';
    const metaObj = metadata[type];
    const Icon = metaObj.icon;
    const boxClassName = metaObj.boxClass;

    return (
        <Link
            className=' border-2 border-black mt-8 dark:border-stone-500 dark:hover:border-stone-100 hover:border-indigo-600 transition-all  block no-underline p-8 rounded-md w-full'
            href={props.href!}
        >
            <div className='flex items-center gap-4'>
                <div className={`${boxClassName}`}>
                    <Icon />
                </div>
                {props.children}
            </div>
        </Link>
    );
};
