import { LOADING_ENUM } from '@/types';
import React from 'react';

interface LoadingProps {
    type: LOADING_ENUM.SMALL | LOADING_ENUM.NORMAL | LOADING_ENUM.LARGER;
}

const Loading = ({ type }: LoadingProps) => {
    return (
        <>
            <div className='ml-4'>
                {type === LOADING_ENUM.SMALL && <div className='w-[10px] h-[10px] rounded-full border-2 border-dashed animate-spin' />}
            </div>
        </>
    );
};

export default Loading;
