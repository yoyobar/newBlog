import { PropsWithChildren } from 'react';
import { BiSolidQuoteLeft } from 'react-icons/bi';

export const Blockquote = ({ children }: PropsWithChildren) => {
    return (
        <div className='bg-whiteInner-content dark:bg-darkInner-content p-2 md:mx-8 my-6 border-l-8 dark:border-l-sky-600 border-l-[#8bbca8] rounded-r-md flex '>
            <BiSolidQuoteLeft className='text-[#8bbca8] dark:text-sky-600 text-3xl' />
            <div className='italic font-semibold text-2xl xl:text-2xl dark:text-[#c8c8c8] text-[#555555]'>{children}</div>
        </div>
    );
};
