import React, { type ComponentProps } from 'react';

export const Strong = ({ children }: ComponentProps<'strong'>) => {
    return <span className='text-red-500 font-normal md:font-bold'>{children}</span>;
};
