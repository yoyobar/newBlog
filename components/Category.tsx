import { getMetadataValues } from '@/utils/mdx/metaData';
import Link from 'next/link';
import SubTitle from './posts/SubTitle';
import { motion } from 'framer-motion';

interface CategoryProps {
    onNav: () => void;
}

const container = {
    hidden: {
        opacity: 1,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 0.9,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1,
        },
    },
};

const variant = {
    hidden: { x: -50, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
    },
};

const Category = ({ onNav }: CategoryProps) => {
    const allCategory = getMetadataValues();
    const category = allCategory.filter((item) => item.visible);

    return (
        <>
            <div className='absolute'>
                <motion.div
                    variants={container}
                    initial='hidden'
                    animate='visible'
                    className='h-fit z-40 fixed flex flex-col gap-4 p-8 w-[300px] rounded-md bg-[rgba(255,255,255,0.98)]  dark:bg-slate-800 text-black border dark:border-black shadow-gray-400 dark:shadow-black shadow-sm'
                >
                    {category.map((item) => (
                        <Link
                            onClick={onNav}
                            className='select-none no-underline transition-all'
                            key={item.key}
                            href={`${item.link}`}
                        >
                            <motion.div variants={variant} whileHover={{ scale: 1.1 }}>
                                <SubTitle type={item.key} />
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
            <div onClick={onNav} className='fixed top-0 w-full h-full z-30'></div>
        </>
    );
};
export default Category;
