'use client';
import React, { useState } from 'react';
import { FootMatterTypes } from '@/config/types';
import { usePathname, useRouter } from 'next/navigation';
import { FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Giscus from './Giscus';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { useCopyToClipboard } from 'react-use';
import CopyRight from './CopyRight';

const Mdx_Footer = ({ footMatter }: { footMatter: FootMatterTypes[] }) => {
    const [copiedText, copy] = useCopyToClipboard();
    const [copyStatus, setCopyStatus] = useState<boolean>(false);
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

    const copyHandler = () => {
        try {
            copy(`https://trouble-wiki.vercel.app${path}`);

            if (!copyStatus) {
                setCopyStatus(true);
                const timeout = setTimeout(() => {
                    setCopyStatus(false);
                }, 2000);

                return () => {
                    clearTimeout(timeout);
                };
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='mt-[150px] mb-20'>
            <div className='flex gap-4 items-center'>
                <motion.button
                    onClick={copyHandler}
                    whileHover={{ opacity: 0.8, translateY: 2 }}
                    whileTap={{ translateY: -3 }}
                    className='p-2 dark:bg-slate-800 text-sky-300 border border-gray-400 rounded-md'
                >
                    <FaShareAlt />
                </motion.button>
                {copyStatus && (
                    <motion.div transition={{ duration: 2 }} animate={{ opacity: [0, 1, 0] }}>
                        Copied!
                    </motion.div>
                )}
            </div>
            <div className='border-b-2 border-dashed border-gray-300 dark:border-[#4e5552] mt-6 mb-6'></div>
            <div>
                <div className='w-full grid grid-cols-2 gap-8 mb-10 mt-10'>
                    {previousPost ? (
                        <motion.div
                            style={{ backgroundImage: `url(${previousPost.image ? previousPost.image : '/logo/template.webp'})` }}
                            onClick={() => routerHandler(previousPost.slug)}
                            whileHover={{ scale: 1.05, opacity: 1 }}
                            className='bg-cover cursor-pointer relative rounded-2xl py-6 border dark:border-gray-500 flex flex-col gap-2'
                        >
                            <div className='ml-20 text-left font-bold text-orange-500 relative  z-10'>이전 포스트</div>
                            <div className='mt-2 text-center mb-6 text-white relative z-10 text-2xl md:text-3xl'>{previousPost.title}</div>

                            <motion.div
                                className='absolute left-4 top-4 text-5xl z-10 text-sky-400'
                                transition={{ repeat: Infinity }}
                                animate={{ translateX: [5, 0, 5] }}
                            >
                                <MdNavigateBefore />
                            </motion.div>
                            <div className='w-full h-full absolute top-0 opacity-25 dark:opacity-50 rounded-2xl bg-black' />
                        </motion.div>
                    ) : (
                        <div className=''></div>
                    )}
                    {nextPost ? (
                        <motion.div
                            style={{ backgroundImage: `url(${nextPost.image ? nextPost.image : '/logo/template.webp'})` }}
                            onClick={() => routerHandler(nextPost.slug)}
                            whileHover={{ scale: 1.05, opacity: 1 }}
                            className='bg-cover cursor-pointer relative rounded-2xl py-6 border dark:border-gray-500 flex flex-col gap-2'
                        >
                            <div className='ml-8 text-left font-bold text-orange-500 relative z-10'>다음 포스트</div>
                            <div className='mt-2 text-center mb-6 text-white relative z-10 text-2xl md:text-3xl'>{nextPost.title}</div>

                            <motion.div
                                className='absolute left-[110px] top-4 text-5xl z-10 text-sky-400'
                                transition={{ repeat: Infinity }}
                                animate={{ translateX: [5, 0, 5] }}
                            >
                                <MdNavigateNext />
                            </motion.div>
                            <div className='w-full h-full absolute top-0 opacity-25 dark:opacity-50 rounded-2xl bg-black' />
                        </motion.div>
                    ) : (
                        <div className=''></div>
                    )}
                </div>
                <Giscus />
                <div className='border-b mt-10 mb-10 dark:border-gray-600'></div>
                <CopyRight />
            </div>
        </div>
    );
};
export default Mdx_Footer;
