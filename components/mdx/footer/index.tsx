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
import { Hr } from '../modules/Hr';
import { PiScissors } from 'react-icons/pi';
import ExportedImage from 'next-image-export-optimizer';
import { CiCalendar } from 'react-icons/ci';
import dayjs from 'dayjs';
import Card from './Card';

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

    return (
        <>
            <div className='w-full border-b border-black dark:border-gray-400 mt-40 mb-10'></div>
            <div>
                <div className='w-full grid grid-cols-2 gap-8'>
                    {previousPost ? <Card {...previousPost} text={'이전 게시글'} onRouter={routerHandler} /> : <div></div>}

                    {nextPost ? <Card {...nextPost} text={'다음 게시글'} onRouter={routerHandler} /> : <div></div>}
                </div>
                <div className='mt-10'>
                    <Giscus />
                </div>
                <div className='w-full mt-20 border-b border-black dark:border-gray-400'></div>
                <CopyRight />
            </div>
        </>
    );
};
export default Mdx_Footer;
