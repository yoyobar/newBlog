'use client';
import React, { type ComponentProps, type ReactElement } from 'react';

export const Tr = ({ ...props }: ComponentProps<'tr'>) => {
    return <tr className='p-0 border-b border-[#3a4150] rounded-md' {...props} />;
};

export const Th = ({ ...props }: ComponentProps<'th'>) => {
    return <th className='p-0 py-2 border border-[#3a4150] border-collapse dark:bg-[#282828]' {...props} />;
};

export const Td = ({ ...props }: ComponentProps<'td'>) => {
    return <td className='px-4 border-x border-[#3a4150]' {...props} />;
};

export const Table = ({ ...props }: ComponentProps<'table'>) => <table className='table-row' {...props} />;
