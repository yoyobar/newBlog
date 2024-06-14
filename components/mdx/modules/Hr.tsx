import React from 'react';
import { PiScissors } from 'react-icons/pi';

export const Hr = () => {
    return (
        <div className='w-full h-4 flex items-center my-4'>
            <PiScissors className='text-4xl mt-1 text-gray-400' />
            <div className='w-full h-full border-b-4 border-dashed rounded-md border-gray-300 dark:border-gray-600'></div>
        </div>
    );
};
