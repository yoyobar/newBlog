'use client';

import { getIntersectionObserver } from '@/utils/observe';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { FaArrowDownShortWide } from 'react-icons/fa6';
import TocContent from './TocContent';
import { useCollapse } from '@/config/store';
import { FiLink } from 'react-icons/fi';
import { TfiCommentAlt } from 'react-icons/tfi';
import { BiArrowToTop } from 'react-icons/bi';
import { useCopyToClipboard } from 'react-use';
import { usePathname } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

const Mdx_Toc = () => {
    const { collapse, setCollapse } = useCollapse();
    const [currentId, setCurrentId] = useState<string>('');
    const [copy, setCopy] = useState(false);
    const [headingEls, setHeadingEls] = useState<Element[]>([]);
    const [state, copyToClipboard] = useCopyToClipboard();
    const path = usePathname();

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

    const scrollToTopHandler = () => {
        const container = document.querySelector('.page-container');
        if (container) {
            container.scroll({
                top: 0,
                behavior: 'smooth',
            });
        }
    };
    const scrollToBottomHandler = () => {
        const container = document.querySelector('.page-container');
        if (container) {
            container.scroll({
                top: container.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    const shareHandler = useCallback(() => {
        copyToClipboard(`https://trouble-wiki.vercel.app${path}`);
        setCopy(true);

        setTimeout(() => {
            setCopy(false);
        }, 1500);
    }, [copyToClipboard, path]);

    return (
        <article className='relative'>
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
                <nav className='hidden lg:flex toc-content right-[215px] 3xl:right-[365px] top-24 z-20 absolute flex-col'>
                    <TocContent currentId={currentId} headingEls={headingEls} />
                </nav>
            )}
            {collapse && (
                <nav className='toc-content right-[50px] lg:right-[250px] 3xl:right-[400px] top-[50px] lg:top-[80px] z-20 absolute flex flex-col'>
                    <motion.div
                        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                        animate='open'
                        initial='collapsed'
                        exit='collapsed'
                        variants={{
                            open: { opacity: 0.9, translateY: 0 },
                            collapsed: { opacity: 0, translateY: 10 },
                        }}
                        className='fixed gap-2 flex flex-col items-center h-fit w-fit'
                    >
                        <div className='relative'>
                            <BiArrowToTop
                                onClick={scrollToTopHandler}
                                className='bg-white dark:bg-darkInner-content dark:text-white text-black border border-gray-400 p-2 rounded-md text-5xl dark:hover:bg-white dark:hover:text-black hover:bg-whiteInner-border cursor-pointer transition'
                            ></BiArrowToTop>
                        </div>
                        <div>
                            <TfiCommentAlt
                                onClick={scrollToBottomHandler}
                                className='bg-white dark:bg-darkInner-content dark:text-white text-black border border-gray-400 p-2 rounded-md text-5xl dark:hover:bg-white dark:hover:text-black hover:bg-whiteInner-border cursor-pointer transition'
                            ></TfiCommentAlt>
                        </div>
                        <div>
                            {copy ? (
                                <motion.div animate={{ opacity: [0, 1] }}>
                                    <FaCheckCircle className='bg-white dark:text-lime-600 text-indigo-400 border  border-gray-400 p-2 rounded-md text-5xl select-none transition' />
                                </motion.div>
                            ) : (
                                <FiLink
                                    onClick={shareHandler}
                                    className='bg-white dark:bg-darkInner-content dark:text-white text-black border border-gray-400 p-2 rounded-md dark:hover:bg-white dark:hover:text-black text-5xl hover:bg-whiteInner-border cursor-pointer transition'
                                />
                            )}
                        </div>
                    </motion.div>
                </nav>
            )}
        </article>
    );
};

export default Mdx_Toc;
