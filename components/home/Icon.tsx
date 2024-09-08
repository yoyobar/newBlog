'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BlurredImage from '../BlurredImage';

interface IconProps {
    src: string;
    name: string;
    href: string;
    hidden: boolean;
    desc: string;
    className?: string;
}

const Icon = ({ src, name, href, hidden, desc, className }: IconProps) => {
    const router = useRouter();

    const selectHandler = () => {
        router.push(href);
    };

    return (
        <motion.div
            title={desc}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={selectHandler}
            className={`${hidden && 'hidden'} ${className} text-white sm:block relative cursor-pointer w-[60px] h-[60px]`}
        >
            <BlurredImage
                className="pointer-events-none absolute top-0 left-0 w-full h-full"
                src={src}
                alt={name}
                width={60}
                height={60}
            />
            <div className=" absolute w-full text-center -bottom-10 text-3xl flex justify-center self-center">
                {name}
            </div>
        </motion.div>
    );
};

export default Icon;
