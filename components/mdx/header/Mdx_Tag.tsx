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
                        <div
                            className='bg-whiteInner-header dark:bg-darkInner-header p-1 text-2xl text-black dark:text-gray-400 rounded-md transition'
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

export default Mdx_tag;
