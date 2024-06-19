import React, { type ComponentProps } from 'react';

export const Strong = ({ children }: ComponentProps<'strong'>) => {
    return <span className='dark:text-red-500 text-red-400 font-bold'>{children}</span>;
};
