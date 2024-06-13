import { getMetadataValues } from '@/utils/metaData';
import Link from 'next/link';
import SubTitle from './posts/SubTitle';
import { motion } from 'framer-motion';

interface CategoryProps {
    onNav: () => void;
    selected: boolean;
}

const Category = ({ onNav, selected }: CategoryProps) => {
    const allCategory = getMetadataValues();
    const category = allCategory.filter((item) => item.visible);

    return (
        <>
            <div className='absolute top-5 left-5 select-none'>
                <motion.div
                    animate={{ scale: [0, 0.95], opacity: [0, 1] }}
                    className='z-40 h-fit fixed flex flex-col gap-4 p-8 w-[300px] rounded-md bg-[rgba(255,255,255,0.98)]  dark:bg-slate-800 text-black border dark:border-black shadow-gray-400 dark:shadow-black shadow-sm'
                >
                    {category.map((item) => (
                        <Link onClick={onNav} className='no-underline transition-all' key={item.key} href={`${item.link}`}>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <SubTitle type={item.key} />
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
            <div onClick={onNav} className='absolute top-0 w-full h-full z-30'></div>
        </>
    );
};
export default Category;
