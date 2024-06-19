'use client';
import React, { type ComponentProps } from 'react';

export const Tr = ({ ...props }: ComponentProps<'tr'>) => {
    return <tr className='p-0 border-b border-[#e5e7eb] dark:border-[#3a4150] rounded-md whitespace-nowrap' {...props} />;
};

export const Th = ({ ...props }: ComponentProps<'th'>) => {
    return (
        <th
            className='p-0 py-2 border border-[#e5e7eb] dark:border-[#3a4150] whitespace-nowrap border-collapse dark:bg-[#282828]'
            {...props}
        />
    );
};

export const Td = ({ ...props }: ComponentProps<'td'>) => {
    return <td className='px-4 border-x border-[#e5e7eb] dark:border-[#3a4150] whitespace-nowrap' {...props} />;
};

export const Table = ({ ...props }: ComponentProps<'table'>) => (
    <div className='overflow-x-auto px-2 m-0'>
        <table className='w-full whitespace-nowrap mb-2 text-xl md:text-2xl lg:text-3xl' {...props} />
    </div>
);
