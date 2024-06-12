'use client';
import { useEffect, useState } from 'react';
import TagList from './TagList';
import Browse from './Browse';
import { MdSort } from 'react-icons/md';
import { MdClose } from 'react-icons/md';

type AllPostsProp = {
    meta: {
        title: string;
        tags: string[];
        date: string;
        readingMinutes: number;
    };
    slug: string;
}[];

const Archives = ({ blogs, tag }: { blogs: AllPostsProp; tag: string }) => {
    const [selected, setSelected] = useState('');

    useEffect(() => {
        setSelected(tag);
    }, [tag]);

    const selectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelected(e.currentTarget.value);
    };

    const tags = blogs.flatMap((blog) => blog.meta.tags);
    const filteredTags = Array.from(new Set(tags));
    const sortedTags = filteredTags.sort((a, b) => a.localeCompare(b));
    return (
        <>
            <div className='flex flex-col gap-8'>
                <div className='text-sky-200xl'>태그에 해당하는 게시글을 조회합니다.</div>
                <TagList onSelect={selectHandler} tags={sortedTags} />
                <div className='flex gap-2 text-4xl items-center'>
                    <MdSort className='text-sky-600' />
                    {selected}
                    {selected !== '' && <MdClose onClick={() => setSelected('')} className='cursor-pointer text-3xl mt-2 text-rose-600' />}
                </div>
                <Browse blogs={blogs} selected={selected} />
            </div>
        </>
    );
};

export default Archives;
