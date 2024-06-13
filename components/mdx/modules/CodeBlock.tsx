'use client';
import { FaCopy } from 'react-icons/fa';
import { useCallback, useRef, useState, type ComponentProps, type ReactElement } from 'react';
import { motion } from 'framer-motion';
import { useCopyToClipboard } from 'react-use';
import { FaCheck } from 'react-icons/fa';
import { FaRegFileLines } from 'react-icons/fa6';

export const FigCaption = ({
    children,
}: ComponentProps<'figcaption'> & {
    filename?: string;
}): ReactElement => {
    return (
        <div className=' w-full md:w-[80%] select-none flex gap-2 items-center text-2xl px-10 p-1 border border-b-0 border-[#e5e7eb] bg-[#fafafa] dark:bg-[#1f1f1f] dark:border-[#3a4150] rounded-t-md'>
            <FaRegFileLines />
            <div>{children}</div>
        </div>
    );
};

export const CodeBlock = ({
    children,
    title,
    ...props
}: ComponentProps<'pre'> & {
    filename?: string;
}): ReactElement => {
    const preRef = useRef<HTMLPreElement | null>(null);
    const [copy, setCopy] = useState(false);
    const [state, copyToClipboard] = useCopyToClipboard();
    const handleCopy = useCallback(() => {
        if (preRef.current) {
            const codeToCopy = preRef.current.innerText;
            copyToClipboard(codeToCopy);
            setCopy(true);

            setTimeout(() => {
                setCopy(false);
            }, 1500);
        }
    }, [copyToClipboard]);

    return (
        <div className=' relative z-10 w-full md:w-[80%]'>
            {!copy && (
                <motion.div
                    onClick={handleCopy}
                    className='cursor-pointer bg-[#fafafa] dark:bg-[#1f1f1f] absolute z-50 right-5 top-5 p-2 rounded-md border dark:border-gray-600 '
                    animate={{ opacity: [0, 1] }}
                    whileHover={{ opacity: 0.7 }}
                >
                    <FaCopy className='text-indigo-400 dark:text-indigo-600' />
                </motion.div>
            )}
            {copy && (
                <motion.div
                    className='cursor-pointer bg-[#fafafa] dark:bg-[#1f1f1f] absolute z-50 right-5 top-5 p-2 rounded-md border dark:border-gray-600'
                    animate={{ opacity: [0, 1] }}
                >
                    <FaCheck className='text-green-400' />
                </motion.div>
            )}

            <pre className='w-full rounded-b-md rounded-t-none overflow-x-visible' ref={preRef} {...props}>
                {children}
            </pre>
        </div>
    );
};
