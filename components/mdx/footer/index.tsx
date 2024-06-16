'use client';
import React from 'react';
import { FootMatterTypes } from '@/config/types';
import { usePathname, useRouter } from 'next/navigation';
import { FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Giscus from './Giscus';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const Mdx_Footer = ({ footMatter }: { footMatter: FootMatterTypes[] }) => {
    const path = usePathname();
    const folderPath = path.split('/')[2];
    const nowPath = path.split('/')[3];
    const router = useRouter();

    //? footMatter 배열을 날짜 기준으로 오름차순 정렬
    const sortedFootMatter = [...footMatter].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    //? 날짜를 기준으로 현재 게시물의 인덱스를 찾기
    const currentIndex = sortedFootMatter.findIndex((matter) => matter.slug === nowPath);

    //? 이전 및 다음 게시물 가져오기
    const previousPost = currentIndex > 0 ? sortedFootMatter[currentIndex - 1] : null;
    const nextPost = currentIndex < sortedFootMatter.length - 1 ? sortedFootMatter[currentIndex + 1] : null;

    const routerHandler = (slug: string) => {
        router.push(`/posts/${folderPath}/${slug}`);
    };

    return (
        <>
            <motion.button
                whileHover={{ opacity: 0.8, translateY: 2 }}
                whileTap={{ translateY: -3 }}
                className='p-2 bg-slate-800 text-sky-300 border border-gray-400 rounded-md'
            >
                <FaShareAlt />
            </motion.button>
            <div className='border-b-2 border-dashed border-[#4e5552] mt-6 mb-6'></div>
            <div>
                <div className='w-full grid grid-cols-2 gap-8 mb-10 mt-10'>
                    {previousPost ? (
                        <motion.div
                            style={{ backgroundImage: `url(${previousPost.image ? previousPost.image : '/logo/template.webp'})` }}
                            onClick={() => routerHandler(previousPost.slug)}
                            whileHover={{ scale: 1.05 }}
                            animate={{ translateX: [2, 0] }}
                            className='bg-cover brightness-75 cursor-pointer relative rounded-md py-6 border dark:border-[#3a3b45] flex flex-col gap-2'
                        >
                            <div className='text-left font-bold'>이전 포스트</div>
                            <div className='mt-2 text-center mb-6 text-white'>{previousPost.title}</div>

                            <MdNavigateBefore className='border rounded-full absolute left-4 top-[35%] text-5xl' />
                        </motion.div>
                    ) : (
                        <div className=''></div>
                    )}
                    {nextPost ? (
                        <div className='relative w-full flex justify-between cursor-pointer rounded-md border dark:border-[#3a3b45]'>
                            <div className='w-1/2 h-full inset-0 z-20 bg-black skew-x-12'></div>
                            <div
                                style={{ backgroundImage: `url(${nextPost.image ? nextPost.image : '/logo/template.webp'})` }}
                                className='bg-cover w-1/2 h-full'
                            >
                                <MdNavigateNext className='border rounded-full absolute right-4 top-[35%] text-5xl' />
                            </div>
                        </div>
                    ) : (
                        <div className=''></div>
                    )}
                </div>
                <Giscus />
            </div>
        </>
    );
};

export default Mdx_Footer;
