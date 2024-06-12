import { getMetadataValues } from '@/utils/metaData';
import Link from 'next/link';
import SubTitle from './posts/SubTitle';

interface CategoryProps {
    onNav: () => void;
}

const Category = ({ onNav }: CategoryProps) => {
    const allCategory = getMetadataValues();
    const category = allCategory.filter((item) => item.visible);

    return (
        <>
            <div className='absolute top-5 left-5 select-none'>
                <div className='z-40 animate-slide fixed flex flex-col gap-4 p-8 w-[300px] rounded-md bg-[rgba(255,255,255,0.98)]  dark:bg-slate-800 text-black border dark:border-black shadow-gray-400 dark:shadow-black shadow-sm'>
                    {category.map((item) => (
                        <Link onClick={onNav} className='no-underline' key={item.key} href={`/posts/${item.link}`}>
                            <SubTitle type={item.key} />
                        </Link>
                    ))}
                </div>
            </div>
            <div onClick={onNav} className='absolute top-0 w-full h-full z-30'></div>
        </>
    );
};
export default Category;
