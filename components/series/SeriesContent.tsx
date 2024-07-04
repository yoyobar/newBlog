import React from 'react';
import { AllPostsProp } from '@/config/types';
import { CiCalendar } from 'react-icons/ci';
import { MdAccessTimeFilled } from 'react-icons/md';
import Link from 'next/link';
interface SeriesContentProps {
    view: AllPostsProp[];
}

const SeriesContent = ({ view }: SeriesContentProps) => {
    return (
        <div className='flex flex-col gap-2'>
            {view.map((item, index) => (
                <Link
                    href={`/posts/${item.slug}`}
                    className='no-underline px-10 flex justify-between cursor-pointer transition hover:bg-gray-300 py-10 mx-4 rounded-md bg-gray-100 dark:bg-gray-600 hover:dark:bg-gray-800'
                    key={`${item}-Content`}
                >
                    {item.meta.title}
                    <div className='hidden lg:flex'>
                        <div className='flex text-2xl gap-2 mr-4 text-gray-400'>
                            <CiCalendar className='text-gray-400' />
                            <div>{item.meta.date.split('-')[0]}</div>
                        </div>
                        <div className='flex text-2xl gap-2 w-[80px]'>
                            <MdAccessTimeFilled className='text-gray-400' />
                            <div className='text-gray-400'>
                                {item.meta.readingMinutes} Min
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SeriesContent;
