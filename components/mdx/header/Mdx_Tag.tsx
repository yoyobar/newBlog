import Link from 'next/link';

interface TagProps {
    tags: string[];
}
const Mdx_tag = ({ tags }: TagProps) => {
    if (!tags) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='flex gap-2'>
                {tags.map((tag) => {
                    return (
                        <Link
                            href={`/archives?tag=${tag}`}
                            className='bg-sky-300 no-underline dark:bg-header dark:hover:brightness-75 cursor-pointer p-1 text-2xl text-black dark:text-gray-400 rounded-md hover:bg-sky-500 transition'
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

export default Mdx_tag;
