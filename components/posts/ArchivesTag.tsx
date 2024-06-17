'use client';

interface TagProps {
    tags: string[];
    onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ArchivesTag = ({ tags, onSelect }: TagProps) => {
    if (!tags) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={'px-2 grid grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4 text-2xl '}>
                {tags.map((tag) => {
                    return (
                        <button
                            onClick={(e) => onSelect(e)}
                            value={tag}
                            className={` bg-sky-200 dark:bg-slate-600 rounded-md p-2 text-gray-950 dark:text-gray-300 hover:bg-sky-400 dark:hover:bg-white dark:hover:text-black transition`}
                            key={tag}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>
        );
    }
};

export default ArchivesTag;