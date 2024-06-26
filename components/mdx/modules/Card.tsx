import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { PropsWithChildren } from 'react';

export interface CardProps extends PropsWithChildren {
    href: string;
    title: string;
}

export const Cards = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='select-none block md:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 '>
            {children}
        </div>
    );
};

export const Card = (props: CardProps) => {
    return (
        <Link
            className='border-2 border-black mt-4 dark:border-stone-500 dark:hover:border-stone-100 hover:border-indigo-600 transition-all  block no-underline rounded-md w-full'
            href={props.href}
        >
            <div className='p-8 w-full h-full flex gap-4 hover:translate-x-4 transition'>
                <FaArrowRight />

                {props.title}
            </div>
        </Link>
    );
};
