'use client';
import { useEffect, useState } from 'react';
import ArchivesTag from './ArchivesTag';
import Browse from './Browse';
import { MdSort } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { useSearchParams } from 'next/navigation';

type AllPostsProp = {
    meta: {
        title: string;
        tags: string[];
        date: string;
        readingMinutes: number;
    };
    slug: string;
}[];

const Archives = ({ tag, blogs }: { tag: string[]; blogs: AllPostsProp }) => {
    const [selected, setSelected] = useState('');
    const params = useSearchParams();
    const tagData = params.get('tag');

    useEffect(() => {
        if (tagData) {
            setSelected(tagData);
        } else {
            setSelected('');
        }
    }, [tagData]);

    const selectHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelected(e.currentTarget.value);
    };

    return (
        <>
            <div className='flex flex-col gap-8'>
                <div className='text-sky-200xl'>태그에 해당하는 게시글을 조회합니다.</div>
                <ArchivesTag onSelect={selectHandler} tags={tag} />
                <div className='flex gap-2 text-4xl items-center'>
                    <MdSort className='text-sky-600' />
                    {selected === '' ? 'ALL' : selected}
                    {selected !== '' && <MdClose onClick={() => setSelected('')} className='cursor-pointer text-3xl mt-2 text-rose-600' />}
                </div>
                <Browse blogs={blogs} selected={selected} />
            </div>
        </>
    );
};

export default Archives;
