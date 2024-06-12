import Link from 'next/link';

interface TagProps {
    tags: string[];
}

const Tag = ({ tags }: TagProps) => {
    if (!tags) {
        return <div className=' text-xl bg-slate-600 rounded-md p-2 text-gray-300 hover:bg-white hover:text-black transition'>None</div>;
    } else {
        return (
            <div className={'flex gap-2 text-xl'}>
                {tags.map((tag) => {
                    return (
                        <Link
                            href={`/posts/archives?tag=${tag}`}
                            className={`no-underline bg-slate-300 dark:bg-slate-600 rounded-md p-2 text-gray-950 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white dark:hover:text-black transition`}
                            key={tag}
                        >
                            {tag}
                        </Link>
                    );
                })}
            </div>
        );
    }
};

export default Tag;
