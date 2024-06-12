import React from 'react';

import { metadata } from '@/utils/metaData';

const SubTitle = ({ type }: { type: string }) => {
    const metaObj = metadata[type] || metadata['all'];
    const Icon = metaObj.icon;
    const boxClassName = metaObj.boxClass;
    const titleName = metaObj.title;

    return (
        <>
            <div className='flex items-center gap-8 px-4 py-4 hover:bg-slate-300 text-3xl hover:text-sky-500 transition-all dark:hover:bg-slate-950 text-black dark:text-white rounded-md'>
                <div className={`${boxClassName} p-3 rounded-full dark:bg-slate-700 bg-slate-200`}>
                    <Icon />
                </div>
                <div className='flex-grow text-3xl'>{titleName}</div>
                <div className='text-sky-500 scale-y-[200%] text-xl'>{'>'}</div>
            </div>
        </>
    );
};

export default SubTitle;
