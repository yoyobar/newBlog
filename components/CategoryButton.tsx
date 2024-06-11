'use client';
import { useState } from 'react';

interface CategoryButtonProps {
    navHandler: () => void;
}

const CategoryButton = ({ navHandler }: CategoryButtonProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={navHandler}
                className='h-full relative z-10 flex flex-col justify-center gap-[5px] cursor-pointer'
            >
                <div className={`transition-width-height h-1 border-b border-2 ${hovered ? 'w-5' : 'w-7'}`}></div>
                <div className={`transition-width-height h-1 border-b border-2 ${hovered ? 'w-8' : 'w-5'}`}></div>
                <div className={`transition-width-height h-1 border-b border-2 ${hovered ? 'w-5' : 'w-8'}`}></div>
            </div>
            <div className={`animate-slideCategory left-[3rem] text-2xl -top-[3rem] ${hovered ? 'relative' : 'hidden'}`}>Posts</div>
        </>
    );
};

export default CategoryButton;
