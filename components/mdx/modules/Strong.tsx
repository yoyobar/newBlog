import React, { type ComponentProps } from 'react';

export const Strong = ({ children }: ComponentProps<'strong'>) => {
    return <span className='text-red-500 font-semibold'>{children}</span>;
};
