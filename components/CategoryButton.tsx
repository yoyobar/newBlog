'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const CategoryButton = () => {
    const router = useRouter();
    const [hover, setHover] = useState(false);
    const path = usePathname();

    const routerBackHandler = () => {
        router.back();
    };

    return (
        <div className='flex h-full items-center gap-4 pr-8'>
            <FaArrowLeft
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={path.includes('/posts/') ? routerBackHandler : undefined}
                className={
                    path.includes('/posts/')
                        ? 'cursor-pointer scale-75 text-4xl hover:scale-100 text-slate-100 transition'
                        : 'scale-75 text-4xl text-gray-500'
                }
            />
            <div className={hover ? 'block text-3xl' : 'invisible text-3xl'}>Back</div>
        </div>
    );
};

export default CategoryButton;
