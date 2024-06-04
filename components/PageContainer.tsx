'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PageContainer = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [endPosition, setEndPosition] = useState({ x: 251, y: -23 });
    const [startPosition, setStartPosition] = useState({ x: 1192, y: 94 });

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

    return (
        <>
            <div
                style={{ left: endPosition.x, top: endPosition.y }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className={`static w-full h-full md:border-t-[80px] border-transparent rounded-md z-10 md:absolute md:w-4/6 md:h-[calc(100%-40px)] animate-pageOn`}
            >
                <header
                    onMouseDown={handleMouseDown}
                    className='flex select-none items-center gap-3 pl-2 rounded-t-md w-full h-[24px] bg-[#4b4b66]'
                >
                    <div onClick={exitHandler} className='cursor-pointer relative w-5 h-5 rounded-full bg-[#ff5f57]'>
                        <div className='left-[3px] bottom-[1px] absolute w-full h-full rounded-full font-bold scale-x-110 text-[#aa3e39]'>
                            X
                        </div>
                    </div>
                    <div onClick={exitHandler} className='cursor-pointer relative w-5 h-5 rounded-full bg-[#fabb2c]'>
                        <div className='top-[5px] left-[3px] absolute w-[7px] h-1 rounded-md bg-[#a87f1f]'></div>
                    </div>
                    <div className='relative w-5 h-5 rounded-full bg-[#28c841]'>
                        <div className='bottom-[3px] left-[2px] absolute w-5 h-5 font-bold -rotate-[40deg] text-xs text-[#146721]'>▲</div>
                        <div className='top-[3px] right-[1px] absolute w-5 h-5 font-bold rotate-[130deg] text-xs text-[#146721]'>▲</div>
                    </div>
                </header>
                <div className='overflow-y-scroll overflow-x-hidden p-2 bg-background h-full rounded-b-md'>
                    <div className='w-full h-full'>{children}</div>
                </div>
            </div>
        </>
    );
};

export default PageContainer;
