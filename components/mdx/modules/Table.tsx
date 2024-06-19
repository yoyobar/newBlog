'use client';
import React, { type ComponentProps } from 'react';

export const Tr = ({ ...props }: ComponentProps<'tr'>) => {
    return <tr className='p-0 border-b border-whiteInner-border dark:border-darkInner-border  rounded-md whitespace-nowrap' {...props} />;
};

export const Th = ({ ...props }: ComponentProps<'th'>) => {
    return (
        <th
            className='p-0 py-2 border border-whiteInner-border dark:border-darkInner-border whitespace-nowrap border-collapse bg-whiteInner-header dark:bg-darkInner-header'
            {...props}
        />
    );
};

export const Td = ({ ...props }: ComponentProps<'td'>) => {
    return <td className='px-4 border-x border-whiteInner-border dark:border-darkInner-border whitespace-nowrap ' {...props} />;
};

export const Table = ({ ...props }: ComponentProps<'table'>) => (
    <div className='overflow-x-auto px-2 m-0'>
        <table className='w-full whitespace-nowrap mb-2 text-xl md:text-2xl lg:text-3xl' {...props} />
    </div>
);
