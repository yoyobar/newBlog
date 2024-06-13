import { LOADING_ENUM } from '@/config/types';
import React from 'react';

interface LoadingProps {
    type: LOADING_ENUM.SMALL | LOADING_ENUM.NORMAL | LOADING_ENUM.LARGER;
}

const Loading = ({ type }: LoadingProps) => {
    return (
        <>
            {type === LOADING_ENUM.SMALL && (
                <div className='ml-4'>
                    <div className='w-[10px] h-[10px] rounded-full border-2 border-dashed animate-spin' />
                </div>
            )}
        </>
    );
};

export default Loading;
