'use client';

import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { MdTipsAndUpdates } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useModal } from '@/config/store';

interface AlertProps {
    title: string;
    subTitle: string;
}

const Alert = ({ title, subTitle }: AlertProps) => {
    const [focus, setFocus] = useState(false);
    const { modal, setModal } = useModal();
    const path = usePathname();

    const closeHandler = () => {
        setModal(false);
    };

    const handleDragEnd = (event: MouseEvent, info: PanInfo) => {
        if (info.offset.x > 80) {
            setModal(false);
        }
    };

    return (
        path === '/' && (
            <AnimatePresence>
                {modal && (
                    <motion.div
                        drag='x'
                        initial={{ translateX: 500 }}
                        exit={{ translateX: 500 }}
                        dragElastic={0}
                        dragDirectionLock={true}
                        dragConstraints={{ left: 0 }}
                        onDragEnd={handleDragEnd}
                        onMouseEnter={() => setFocus(true)}
                        onMouseLeave={() => setFocus(false)}
                        transition={{ type: 'spring', duration: 1.2 }}
                        animate={{ translateX: 0 }}
                        className='border border-[#565656] absolute
                        right-10 top-20 p-4 rounded-3xl bg-slate-800
                        w-[350px] min-h-[78px] shadow-sm shadow-[#3f3f3f]
                        hidden sm:flex select-none flex-col items-center gap-4 text-white'
                    >
                        <div className='flex w-full h-full gap-8'>
                            <MdTipsAndUpdates className='h-full flex self-center justify-center text-4xl text-yellow-300 animate-pulse' />
                            <div className='flex flex-col gap-2 h-full'>
                                <div className='text-2xl font-bold'>{title}</div>
                                <div className='text-2xl'>{subTitle}</div>
                            </div>
                        </div>

                        <RxCross2
                            onClick={closeHandler}
                            className={`${
                                focus ? 'opacity-100' : 'opacity-0'
                            } transition absolute cursor-pointer -top-4 -left-2 text-4xl border-[#565656] shadow-sm shadow-[#3f3f3f] bg-slate-800 rounded-full p-1 m-1`}
                        >
                            X
                        </RxCross2>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    );
};

export default Alert;
