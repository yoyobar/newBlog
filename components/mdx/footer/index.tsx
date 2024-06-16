'use client';
import React from 'react';
import { FootMatterTypes } from '@/config/types';
import { usePathname } from 'next/navigation';

import { FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
const Mdx_Footer = ({ footMatter }: { footMatter: FootMatterTypes[] }) => {
    const path = usePathname();
    const nowPath = path.split('/').pop();

    const currentIndex = footMatter.findIndex((matter) => matter.slug === nowPath);

    const previousPost = currentIndex > 0 ? footMatter[currentIndex - 1] : null;
    const nextPost = currentIndex < footMatter.length - 1 ? footMatter[currentIndex + 1] : null;

    console.log('Previous Post:', previousPost);
    console.log('Next Post:', nextPost);

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
                <div className='w-full h-[100px] border'>댓글</div>
                <div className='w-full grid grid-cols-2 gap-4 mb-20 mt-20'>
                    {previousPost ? (
                        <div className='border rounded-md'>
                            <div>이전 포스트</div>
                            <p>{previousPost.title}</p>
                        </div>
                    ) : (
                        <div className='border rounded-md'></div>
                    )}
                    {nextPost ? (
                        <div className='border rounded-md p-2'>
                            <div>다음 포스트</div>
                            <p>{nextPost.title}</p>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Mdx_Footer;
