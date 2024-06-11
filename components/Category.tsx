'use client';
import { getMetadataValues } from '@/lib/metaData';
import Link from 'next/link';

const Category = () => {
    const allCategory = getMetadataValues();
    const category = allCategory.filter((item) => item.visible);

    return (
        <div className='absolute z-50 top-0 left-0 w-[200px] h-full bg-white text-black'>
            <div className='flex flex-col'>
                {category.map((category) => (
                    <Link className='no-underline' key={category.key} href={`/posts/${category.link}`}>
                        {category.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Category;
