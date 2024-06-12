'use client';
import { useState } from 'react';
import TagList from './TagList';
import Browse from './Browse';

type AllPostsProp = {
    meta: {
        title: string;
        tags: string[];
        date: string;
        readingMinutes: number;
    };
    slug: string;
}[];

const Archives = ({ blogs }: { blogs: AllPostsProp }) => {
    const [selected, setSelected] = useState('all');

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
                <Browse blogs={blogs} selected={selected} />
            </div>
        </>
    );
};

export default Archives;
