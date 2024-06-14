import Link from 'next/link';

interface TagProps {
    tags: string[];
}

const BrowseTag = ({ tags }: TagProps) => {
    if (!tags || tags.length === 0) {
        return <div className='text-xl bg-slate-600 rounded-md p-2 text-gray-300 hover:bg-white hover:text-black transition'>None</div>;
    }

    return (
        <div className='gap-2 text-xl z-10 absolute bottom-4 left-10 flex'>
            {tags.map((tag) => (
                <Link
                    href={`/archives?tag=${tag}`}
                    className='no-underline cursor-pointer bg-slate-300 dark:bg-slate-600 rounded-md p-2 text-gray-950 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white dark:hover:text-black transition`'
                    key={tag}
                >
                    {tag}
                </Link>
            ))}
        </div>
    );
};

export default BrowseTag;
