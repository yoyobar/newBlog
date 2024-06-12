interface TagProps {
    tags: string[];
    type?: string;
}

const Tag = ({ tags, type }: TagProps) => {
    if (!tags) {
        return <div className=' text-xl bg-slate-600 rounded-md p-2 text-gray-300 hover:bg-white hover:text-black transition'>None</div>;
    } else {
        return (
            <div className={`${type ? 'gap-4 grid grid-cols-3 w-full p-16 text-5xl text-center' : 'flex gap-2 text-xl'}`}>
                {tags.map((tag) => {
                    return (
                        <div
                            className={`${type && 'p-4'} no-underline bg-slate-300 dark:bg-slate-600 rounded-md p-2 text-gray-950 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white dark:hover:text-black transition`}
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
