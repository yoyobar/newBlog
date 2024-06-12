'use client';

interface TagProps {
    tags: string[];
    onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TagTest = ({ tags, onSelect }: TagProps) => {
    if (!tags) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={'grid grid-cols-6 gap-4 text-2xl '}>
                <button
                    onClick={(e) => onSelect(e)}
                    value={''}
                    className={` bg-slate-300 dark:bg-slate-600 rounded-md p-2 text-gray-950 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white dark:hover:text-black transition`}
                >
                    all
                </button>
                {tags.map((tag) => {
                    return (
                        <button
                            onClick={(e) => onSelect(e)}
                            value={tag}
                            className={` bg-slate-300 dark:bg-slate-600 rounded-md p-2 text-gray-950 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white dark:hover:text-black transition`}
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

export default TagTest;
