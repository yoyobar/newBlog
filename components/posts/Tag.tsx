'use client';

import { useRouter } from 'next/navigation';

interface TagProps {
    tags: string[];
    type?: string;
}

const Tag = ({ tags, type }: TagProps) => {
    const router = useRouter();

    const routerHandler = (tag: string) => {
        router.push(`/posts/archives?tag=${tag}`);
    };

    if (!tags) {
        return (
            <div className=' text-xl bg-sky-200 hover:bg-sky-400 dark:bg-slate-600 dark:hover:bg-white rounded-md p-2 text-gray-300  hover:text-black transition'>
                None
            </div>
        );
    } else {
        return (
            <div className={`${type ? 'gap-4 grid grid-cols-3 w-full p-16 text-5xl text-center' : 'flex gap-2 text-xl'}`}>
                {tags.map((tag) => {
                    return (
                        <div
                            onClick={() => routerHandler(tag)}
                            className={`${type && 'p-4'} cursor-pointer no-underline bg-sky-200 hover:bg-sky-400 dark:bg-slate-600 dark:hover:bg-white rounded-md p-2 text-gray-950 dark:text-gray-300  dark:hover:text-black transition`}
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
