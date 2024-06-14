import React from 'react';
import { FrontMatterTypes } from '@/config/types';
import { TbCategoryFilled } from 'react-icons/tb';
import { CiShoppingTag } from 'react-icons/ci';
import { CiCalendar } from 'react-icons/ci';
import Image from 'next/image';
import Mdx_Tag from './Mdx_Tag';
import dayjs from 'dayjs';
import Link from 'next/link';

const Mdx_Header = ({ frontMatter }: { frontMatter: FrontMatterTypes }) => {
    const formatDate = (date: Date) => {
        const data = dayjs(date, 'YYYY-MM-DD HH:mm:ss');
        return data.format('YYYY-MM-DD A h:mm:ss');
    };

    const date = formatDate(frontMatter.date);
    const updateDate = formatDate(frontMatter.update);
    return (
        <div className='select-none'>
            {frontMatter?.image && (
                <div className='relative min-w-full min-h-[400px] mt-4'>
                    <Image className='rounded-md m-0 p-0' fill alt={frontMatter.description} src={frontMatter.image} />
                </div>
            )}
            <div className='flex flex-col justify-center items-center mt-10'>
                <div className='w-full md:w-[80%] flex flex-col gap-6'>
                    <div className='text-5xl md:text-6xl text-black dark:text-white font-bold mb-8'>{frontMatter.title}</div>
                    <article className='text-2xl flex gap-16 items-center text-gray-400'>
                        <div className='flex gap-2 w-[100px] items-center'>
                            <TbCategoryFilled />
                            <div>Category</div>
                        </div>
                        <Link
                            href={`/posts/${frontMatter.category}`}
                            className='no-underline cursor-pointer hover:brightness-75 transition p-1 rounded-md bg-sky-300 dark:hover:brightness-75 hover:bg-sky-500 text-black dark:bg-header dark:text-gray-400 text-2xl'
                        >
                            {frontMatter.category}
                        </Link>
                    </article>
                    <article className='text-2xl flex gap-16 items-center text-gray-400'>
                        <div className='flex gap-2 w-[100px] items-center'>
                            <CiShoppingTag />
                            <div>Tags</div>
                        </div>
                        <Mdx_Tag tags={frontMatter.tags} />
                    </article>
                    <article className='text-2xl flex gap-16 items-center text-gray-400'>
                        <div className='flex gap-2 w-[100px] items-center'>
                            <CiCalendar />
                            <div>Create At</div>
                        </div>
                        <div className='p-1 text-gray-400 text-2xl'>{date}</div>
                    </article>
                    <article className='text-2xl flex gap-16 items-center text-gray-400'>
                        <div className='flex gap-2 w-[100px] items-center'>
                            <CiCalendar />
                            <div>Update At</div>
                        </div>
                        <div className='p-1 text-gray-400 text-2xl'>{updateDate}</div>
                    </article>
                    <div className='border-b border-[#4e5552] mt-6 mb-6'></div>
                </div>
            </div>
        </div>
    );
};

export default Mdx_Header;
