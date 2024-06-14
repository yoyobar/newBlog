import { PropsWithChildren } from 'react';
import { BiSolidQuoteLeft } from 'react-icons/bi';

export const Blockquote = ({ children }: PropsWithChildren) => {
    return (
        <div className='bg-[#ededed] dark:bg-[#383838] p-2 border-l-8 dark:border-l-green-600 border-l-[#8bbca8] rounded-r-md flex '>
            <BiSolidQuoteLeft className='text-[#8bbca8] dark:text-green-600 text-5xl' />
            <div className='italic px-6 font-semibold text-2xl xl:text-2xl dark:text-[#c8c8c8] text-[#555555]'>{children}</div>
        </div>
    );
};
