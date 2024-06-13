// components/Tag.tsx
import Link from 'next/link';

interface TagProps {
    tags: string[];
}

const Tag = ({ tags }: TagProps) => {
    if (!tags || tags.length === 0) {
        return <div className='text-xl bg-slate-600 rounded-md p-2 text-gray-300 hover:bg-white hover:text-black transition'>None</div>;
    }

    return (
        <div className='flex gap-2 text-x z-10'>
            {tags.map((tag) => (
                <Link
                    className='no-underline cursor-pointer bg-slate-300 dark:bg-slate-600 rounded-md p-2 text-gray-950 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white dark:hover:text-black transition`'
                    key={tag}
                    href={`/archives?tag=${tag}`}
                    passHref
                >
                    {tag}
                </Link>
            ))}
        </div>
    );
};

export default Tag;
