import { LOADING_ENUM } from '@/config/types';
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
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

            {type === LOADING_ENUM.NORMAL && (
                <div className='w-full h-full'>
                    <AiOutlineLoading3Quarters className='mt-10 mx-auto animate-spin text-9xl dark:text-slate-200 text-violet-700' />
                </div>
            )}
        </>
    );
};

export default Loading;
