'use client';
import { FaRegClipboard } from 'react-icons/fa6';
import React, { useCallback, useRef, useState, type ReactNode, type ComponentProps, type ReactElement } from 'react';
import { motion } from 'framer-motion';
import { useCopyToClipboard } from 'react-use';
import { FaCheck } from 'react-icons/fa';

export const CodeBlock = ({
    children,
    title,
    ...props
}: ComponentProps<'pre'> & {
    filename?: string;
    children?: ReactNode;
}): ReactElement => {
    const preRef = useRef<HTMLPreElement | null>(null);
    const [copy, setCopy] = useState(false);
    const [visible, setVisible] = useState(false);
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

    const language = React.isValidElement(children) ? children.props['data-language'] : null;

    return (
        <>
            <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='relative z-10 overflow-x-visible'>
                <div className='w-auto bg-[#3a3b45] h-[30px] rounded-t-md flex justify-between items-center px-6'>
                    <div className='flex gap-3'>
                        <div className='w-[12px] h-[12px] rounded-full bg-[#e57061]'></div>
                        <div className='w-[12px] h-[12px] rounded-full bg-[#f0bf4f]'></div>
                        <div className='w-[12px] h-[12px] rounded-full bg-[#6fc855]'></div>
                    </div>
                    <div className='text-orange-500'>{language}</div>
                </div>
                <pre className='p-0 m-0 w-full rounded-b-md rounded-t-none border dark:border-[#3a3b45]' ref={preRef} {...props}>
                    {!copy && visible && (
                        <motion.div
                            onClick={handleCopy}
                            className='cursor-pointer bg-[#fafafa] dark:bg-[#1f1f1f] absolute z-50 right-5 top-20 p-2 rounded-md border dark:border-gray-600 '
                            animate={{ opacity: [0, 1], y: [10, 0] }}
                            whileHover={{ opacity: 0.7 }}
                        >
                            <FaRegClipboard className='dark:text-gray-300 text-gray-700' />
                        </motion.div>
                    )}
                    {copy && visible && (
                        <motion.div
                            className='cursor-pointer bg-[#fafafa] dark:bg-[#1f1f1f] absolute z-50 right-5 top-20 p-2 rounded-md border dark:border-gray-600'
                            animate={{ opacity: [0, 1], y: [10, 0] }}
                        >
                            <FaCheck className='text-green-400' />
                        </motion.div>
                    )}
                    <code className='bg-whiteInner-content dark:bg-darkInner-content'>
                        <div className='max-h-[250px]  md:max-h-[400px] overflow-x-auto overflow-y-auto p-4 xl:p-8'>{children}</div>
                    </code>
                </pre>
            </div>
        </>
    );
};
