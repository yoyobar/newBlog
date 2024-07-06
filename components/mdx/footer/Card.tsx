import dayjs from 'dayjs';
import React from 'react';
import { CiCalendar } from 'react-icons/ci';
import { CDN } from '@/config/const';
import BlurredImageFill from '@/components/BlurredImageFill';

interface CardProps {
    description: string;
    image: string | undefined;
    title: string;
    date: Date;
    slug: string;
    text: string;
    onRouter: (slug: string) => void;
}

const Card = ({ description, image, title, date, slug, text, onRouter }: CardProps) => {
    const routerHandler = (slug: string) => {
        onRouter(slug);
    };

    return (
        <nav
            onClick={() => routerHandler(slug)}
            className="cursor-pointer flex h-fit md:h-[300px] flex-col gap-3 overflow-hidden rounded-md border shadow-md transition-all hover:shadow-xl dark:border-slate-700 dark:hover:border-white"
        >
            <div className="relative aspect-video rounded-t-md border-b dark:border-slate-700">
                <BlurredImageFill
                    sizes="(max-width: 1000px) 50vw, 250px"
                    className="p-0 m-0 inset-0 object-cover text-transparent"
                    alt={description}
                    src={image ? CDN + image : CDN + '/img/template_post.webp'}
                />
            </div>

            <div className="flex flex-1 flex-col justify-between p-4 pt-1">
                <div className="mb-3 mt-1 font-bold text-2xl md:text-3xl text-pink-600">{text}</div>
                <div className="mb-3 mt-1 font-bold text-2xl md:text-3xl">{title}</div>
                <div className="flex text-2xl justify-between items-center text-gray-600 dark:text-gray-300">
                    <div className="flex gap-2 items-center">
                        <CiCalendar className="text-3xl" /> <div>{dayjs(date).format('YYYY년 MM월 DD일')}</div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Card;
