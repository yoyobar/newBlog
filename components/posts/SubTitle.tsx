import React from 'react';

import { metadata } from '@/lib/metaData';

const SubTitle = ({ type }: { type: string }) => {
    const metaObj = metadata[type] || metadata['all'];
    const Icon = metaObj.icon;
    const boxClassName = metaObj.boxClass;
    const titleName = metaObj.title;

    return (
        <>
            <div className='flex items-center gap-8 px-4 py-4 transition hover:bg-slate-300 dark:hover:bg-slate-950 text-black dark:text-white rounded-md'>
                <div className={`${boxClassName} text-3xl p-3 rounded-full dark:bg-slate-700 bg-slate-200`}>
                    <Icon />
                </div>
                <div className='text-3xl flex-grow'>{titleName}</div>
                <div className='text-sky-500 scale-y-[200%]'>{'>'}</div>
            </div>
        </>
    );
};

export default SubTitle;
