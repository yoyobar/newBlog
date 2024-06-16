'use client';

import { getIntersectionObserver } from '@/utils/observe';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowDownShortWide } from 'react-icons/fa6';
import TocContent from './TocContent';
import { useCollapse } from '@/config/store';

const Mdx_Toc = () => {
    const { collapse, setCollapse } = useCollapse();
    const [currentId, setCurrentId] = useState<string>('');
    const [headingEls, setHeadingEls] = useState<Element[]>([]);

    useEffect(() => {
        const pageContainer = document.querySelector('.page-container');
        if (!pageContainer) return;

        const observer = getIntersectionObserver(pageContainer, setCurrentId);
        const headingElements = Array.from(document.querySelectorAll('h2, h3'));

        setHeadingEls(headingElements);

        headingElements.forEach((header) => {
            observer.observe(header);
        });

        return () => {
            headingElements.forEach((header) => {
                observer.unobserve(header);
            });
        };
    }, []);

    return (
        <div className='relative'>
            <div className='absolute right-[55px] z-50 3xl:right-[100px]'>
                <motion.button
                    initial={false}
                    onClick={setCollapse}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className='toc-toggle-button fixed w-[40px] h-[40px] rounded-md opacity-75 bg-slate-200 dark:bg-gray-800 border dark:text-sky-300 flex justify-center items-center'
                >
                    <FaArrowDownShortWide />
                </motion.button>
            </div>

            {collapse && (
                <div className='toc-content right-[215px] 3xl:right-[365px] top-24 z-20 absolute'>
                    <TocContent currentId={currentId} headingEls={headingEls} />
                </div>
            )}
        </div>
    );
};

export default Mdx_Toc;
