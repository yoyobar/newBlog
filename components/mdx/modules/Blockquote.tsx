import { PropsWithChildren } from 'react';
import { BiSolidQuoteLeft } from 'react-icons/bi';

export const Blockquote = ({ children }: PropsWithChildren) => {
    return (
        <div className='bg-[#ededed] p-2 border-l-8 border-l-[#8bbca8] rounded-r-md flex '>
            <BiSolidQuoteLeft className='text-[#8bbca8] text-5xl' />
            <div className='italic font-semibold text-3xl text-[#555555]'>{children}</div>
        </div>
    );
};
