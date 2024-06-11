interface TagProps {
    tags: string[];
}
const Tag = ({ tags }: TagProps) => {
    if (tags.length === 0) {
        return <div className=' text-xl bg-slate-600 rounded-md p-2 text-gray-300 hover:bg-white hover:text-black transition'>None</div>;
    } else {
        return (
            <div className='flex gap-2'>
                {tags.map((tag) => {
                    return (
                        <div
                            className='no-underline text-xl bg-slate-300 dark:bg-slate-600 rounded-md p-2 text-gray-950 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white dark:hover:text-black transition'
                            key={tag}
                        >
                            {tag}
                        </div>
                    );
                })}
            </div>
        );
    }
};

export default Tag;
