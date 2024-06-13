'use client';
import { FaCopy } from 'react-icons/fa';
import { useCallback, useRef, useState, type ComponentProps, type ReactElement } from 'react';
import { motion } from 'framer-motion';
import { useCopyToClipboard } from 'react-use';
import { FaCheck } from 'react-icons/fa';

export const CodeBlock = ({
    children,
    ...props
}: ComponentProps<'pre'> & {
    filename?: string;
    hasCopyCode?: boolean;
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
        <div className='relative'>
            {!copy && (
                <motion.div onClick={handleCopy} className='cursor-pointer' animate={{ opacity: [0, 1] }} whileHover={{ opacity: 0.7 }}>
                    <FaCopy className='text-indigo-400 absolute right-5 top-5 p-2 rounded-md border w-[30px] h-[30px]' />
                </motion.div>
            )}
            {copy && (
                <motion.div className='cursor-pointer' animate={{ opacity: [0, 1] }}>
                    <FaCheck className='text-green-400 absolute right-5 top-5 p-2 rounded-md border w-[30px] h-[30px]' />
                </motion.div>
            )}
            <pre ref={preRef} {...props}>
                {children}
            </pre>
        </div>
    );
};
