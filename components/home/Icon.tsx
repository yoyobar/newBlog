'use client';
import { motion } from 'framer-motion';
import ExportedImage from 'next-image-export-optimizer';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

interface IconProps {
    src: string;
    name: string;
    href: string;
    hidden: boolean;
    desc: string;
}

const Icon = ({ src, name, href, hidden, desc }: IconProps) => {
    const router = useRouter();
    const clickCount = useRef(0);

    const doubleSelectHandler = () => {
        clickCount.current += 1;

        if (clickCount.current === 1) {
            setTimeout(() => {
                clickCount.current = 0;
            }, 300);
        } else if (clickCount.current === 2) {
            clickCount.current = 0;
            router.push(href);
        }
    };

    return (
        <motion.div
            title={desc}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            drag
            whileDrag={{ opacity: 0.5, scale: 0.9 }}
            dragPropagation={false}
            onClick={doubleSelectHandler}
            className={`${
                hidden && 'hidden'
            } text-white sm:block relative w-[60px] h-[60px]`}
            style={{ cursor: 'grab' }}
            dragMomentum={false}
        >
            <ExportedImage
                className='absolute top-0 left-0 w-full h-full'
                src={src}
                alt={name}
                width={60}
                height={60}
                style={{ pointerEvents: 'none' }}
            />
            <div className=' absolute w-[60px] text-center -bottom-10 text-3xl'>
                {name}
            </div>
        </motion.div>
    );
};

export default Icon;
