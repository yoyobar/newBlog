import { getMetadataValues } from '@/utils/mdx/metaData';
import Link from 'next/link';
import SubTitle from './posts/SubTitle';
import { motion } from 'framer-motion';

interface CategoryProps {
    onNav: () => void;
}

const Category = ({ onNav }: CategoryProps) => {
    const allCategory = getMetadataValues();
    const category = allCategory.filter((item) => item.visible);

    return (
        <>
            <div className='absolute top-8 left-8'>
                <motion.div
                    animate={{ opacity: [0, 1] }}
                    className='h-[370px] overflow-y-scroll z-40 fixed flex flex-col gap-4 p-8 w-[300px] rounded-md bg-[rgba(255,255,255,0.98)]  dark:bg-slate-800 text-black border dark:border-black shadow-gray-400 dark:shadow-black shadow-sm'
                >
                    {category.map((item) => (
                        <Link
                            onClick={onNav}
                            className='select-none no-underline transition-all'
                            key={item.key}
                            href={`${item.link}`}
                        >
                            <div className='hover:scale-110 transition'>
                                <SubTitle type={item.key} />
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
            <div onClick={onNav} className='fixed top-0 w-full h-full z-20'></div>
        </>
    );
};
export default Category;
