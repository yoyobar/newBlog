import { motion } from 'framer-motion';
import React from 'react';
import { GoDash } from 'react-icons/go';
import { HiOutlineHashtag } from 'react-icons/hi';

interface TocProps {
    headingEls: Element[];
    currentId: string;
}

const TocContent = ({ headingEls, currentId }: TocProps) => {
    const handleHeadingClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            animate='open'
            initial='collapsed'
            exit='collapsed'
            variants={{
                open: { opacity: 0.75, translateY: 0 },
                collapsed: { opacity: 0, translateY: 10 },
            }}
            className='fixed w-[200px] 3xl:w-[300px] max-h-[500px] overflow-y-scroll overflow-x-hidden border dark:border-none dark:bg-[#383838] rounded-md'
        >
            {headingEls.map((headingEl) => {
                const tagName = headingEl.tagName.toLowerCase();
                let headingStyle = '';
                let showDot = false;
                let showDash = false;

                switch (tagName) {
                    case 'h2':
                        headingStyle += 'text-2xl xl:text-3xl 3xl:text-4xl 3xl:font-bold';
                        showDot = true;
                        showDash = false;
                        break;
                    case 'h3':
                        headingStyle += 'text-xl xl:text-2xl pl-8 3xl:text-3xl';
                        showDot = false;
                        showDash = true;
                        break;
                    default:
                        break;
                }

                if (headingEl.id === currentId) {
                    headingStyle += ' text-sky-600 dark:text-orange-600';
                }

                return (
                    <motion.div
                        whileHover={{ translateX: 5 }}
                        onClick={() => handleHeadingClick(headingEl.id)}
                        className={`${headingStyle} p-4 cursor-pointer flex gap-1 3xl:gap-2`}
                        id={`toc-${headingEl.id}`}
                        key={headingEl.id}
                    >
                        {showDot && <HiOutlineHashtag />}
                        {showDash && <GoDash />}
                        {headingEl.textContent}
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default TocContent;
