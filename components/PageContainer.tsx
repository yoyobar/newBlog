'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PageContainer = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [minimization, setMinimization] = useState(false);

    const router = useRouter();

    const exitHandler = () => {
        router.push('/');
    };
    const minimizationHandler = () => {
        setMinimization(true);
        setTimeout(() => {
            router.push('/');
        }, 200);
    };

    return (
        <>
            <div
                className={`${minimization && 'animate-pageOff'} absolute rounded-md w-full h-full top-14 z-10 md:w-5/6 md:h-[calc(100%-40px)] md:right-2 bg-background animate-pageOn`}
            >
                <header className='flex select-none items-center gap-3 pl-2 rounded-t-md w-full h-[20px] bg-[#4b4b66]'>
                    <div onClick={exitHandler} className='cursor-pointer relative w-5 h-5 rounded-full bg-[#ff5f57]'>
                        <div className='left-[3px] bottom-[1px] absolute w-full h-full rounded-full font-bold scale-x-110 text-[#aa3e39]'>
                            X
                        </div>
                    </div>
                    <div onClick={minimizationHandler} className='cursor-pointer relative w-5 h-5 rounded-full bg-[#fabb2c]'>
                        <div className='top-[5px] left-[3px] absolute w-[7px] h-1 rounded-md bg-[#a87f1f]'></div>
                    </div>
                    <div className='relative w-5 h-5 rounded-full bg-[#28c841]'>
                        <div className='bottom-[3px] left-[2px] absolute w-5 h-5 font-bold -rotate-[40deg] text-xs text-[#146721]'>▲</div>
                        <div className='top-[3px] right-[1px] absolute w-5 h-5 font-bold rotate-[130deg] text-xs text-[#146721]'>▲</div>
                    </div>
                </header>
                <div className='overflow-y-scroll overflow-x-hidden p-2 mr-2 h-[calc(100%-20px)]'>
                    <div className='w-full h-full'>{children}</div>
                </div>
            </div>
        </>
    );
};

export default PageContainer;
