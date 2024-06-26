'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoSearchSharp } from 'react-icons/io5';

interface BrowseCategoryProps {
    categories: { [key: string]: number };
}

const BrowseCategory = ({ categories }: BrowseCategoryProps) => {
    const categoryValue = Object.values(categories);
    const categoryKey = Object.keys(categories);
    const path = usePathname();

    return (
        <>
            {categoryKey.map((category, index) => {
                const isAll = category === 'All';
                const isActive =
                    (isAll && path === '/posts') ||
                    (!isAll && path === `/posts/${category}`);

                return (
                    <Link
                        href={isAll ? '/posts' : `/posts/${category}`}
                        className={`${
                            isActive
                                ? 'bg-black dark:bg-white dark:text-black text-white'
                                : 'hover:bg-slate-200 dark:hover:bg-darkInner-border'
                        } 
                                no-underline p-2 rounded-md font-mono text-2xl transition`}
                        key={category}
                    >
                        <div>{`${category} (${categoryValue[index]})`}</div>
                    </Link>
                );
            })}
        </>
    );
};

export default BrowseCategory;
