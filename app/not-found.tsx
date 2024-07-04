import Link from 'next/link';
import React from 'react';

const notfound = () => {
    return (
        <div className='absolute flex gap-8 flex-col justify-center items-center z-50 left-0 top-0 w-full h-full bg-black'>
            <div className='text-white text-5xl'>404 NOT FOUND</div>
            <div className='text-white text-5xl'>잘못된 페이지 요청입니다.</div>
            <Link
                className='text-white transition hover:bg-slate-900 bg-slate-700 rounded-md p-4 text-4xl'
                href={'/'}
            >
                돌아가기
            </Link>
        </div>
    );
};

export default notfound;
