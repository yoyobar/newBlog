'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { MdOpenInFull } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
const PageContainer = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [endPosition, setEndPosition] = useState({ x: 251, y: -23 });
    const [startPosition, setStartPosition] = useState({ x: 1192, y: 94 });
    const [isMaximize, setIsMaximize] = useState(false);
    const clickCount = useRef(0);

    const exitHandler = () => {
        router.push('/');
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartPosition({
            x: e.clientX - endPosition.x,
            y: e.clientY - endPosition.y,
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            setEndPosition({
                x: e.clientX - startPosition.x,
                y: e.clientY - startPosition.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const maximizeHandler = () => {
        setIsMaximize((prev) => !prev);
    };

    const doubleMaximizeHandler = () => {
        clickCount.current += 1;

        if (clickCount.current === 1) {
            setTimeout(() => {
                clickCount.current = 0;
            }, 300);
        } else if (clickCount.current === 2) {
            clickCount.current = 0;
            maximizeHandler();
        }
    };

    return (
        <>
            <div
                style={{ left: endPosition.x, top: endPosition.y }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className={`${!isMaximize && 'md:border-t-[80px] md:absolute md:w-4/6 md:h-[calc(100%-40px)]'} 
                static left-0 w-full h-full transition-width-height
                border-transparent rounded-md z-10 `}
            >
                <header
                    onClick={doubleMaximizeHandler}
                    onMouseDown={handleMouseDown}
                    className='flex select-none items-center gap-3 pl-2 rounded-t-md w-full h-[24px] bg-[#4b4b66]'
                >
                    <div onClick={exitHandler} className='cursor-pointer relative w-5 h-5 rounded-full bg-[#ff5f57]'>
                        <IoMdClose className='absolute w-full h-full rounded-full font-bold scale-x-110 text-[#aa3e39]' />
                    </div>
                    <div onClick={exitHandler} className='cursor-pointer relative w-5 h-5 rounded-full bg-[#fabb2c]'>
                        <div className='top-[5px] left-[3px] absolute w-[7px] h-1 rounded-md bg-[#a87f1f]'></div>
                    </div>
                    <div onClick={maximizeHandler} className='cursor-pointer hidden md:block relative w-5 h-5 rounded-full bg-[#28c841]'>
                        <MdOpenInFull className='left-[0.14rem] absolute w-4 h-5 font-bold text-xs text-[#146721]' />
                    </div>
                </header>
                <div className='overflow-y-scroll p-6 bg-slate-100 dark:bg-background h-full rounded-b-md'>
                    <div className='text-3xl prose dark:prose-invert m-auto min-w-[70%]'>{children}</div>
                </div>
            </div>
        </>
    );
};

export default PageContainer;
