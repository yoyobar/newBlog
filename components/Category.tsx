'use client';
import { getMetadataValues } from '@/lib/metaData';
import Link from 'next/link';
import SubTitle from './posts/SubTitle';

const Category = () => {
    const allCategory = getMetadataValues();
    const category = allCategory.filter((item) => item.visible);

    return (
        <div className='animate-slide absolute z-50 top-0 left-0 w-[300px] h-full bg-slate-50 dark:bg-slate-800 text-black border-r dark:border-r-black shadow-gray-400 dark:shadow-black shadow-sm'>
            <div className='flex flex-col gap-4 p-8'>
                {category.map((item) => (
                    <Link className='no-underline' key={item.key} href={`/posts/${item.link}`}>
                        <SubTitle type={item.key} />
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Category;
