'use client';

import PageContainer from '@/components/PageContainer';
import { useState } from 'react';

const Setting = () => {
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
    };

    return (
        <>
            <PageContainer>
                <div className='select-none p-10 flex flex-col text-header-text'>
                    <div className='text-5xl font-bold'>옵션 설정</div>

                    <div className='text-3xl mt-32 mb-10 bg-slate-600 p-4 rounded-md'>애니메이션 설정</div>

                    <div>
                        <input className='hidden peer' id='animation-option' type='checkbox' />
                        <label
                            className='
                        inline-flex items-center justify-between w-fit
                        p-5 text-gray-500 bg-header-text
                        rounded-lg cursor-pointer peer-checked:bg-indigo-600 peer-checked:text-white hover:text-gray-600'
                            htmlFor='animation-option'
                        >
                            <div className='block'>
                                <div className='w-full text-3xl font-semibold'>애니메이션 활성화</div>
                                <div className='w-full text-2xl'>Snow 애니메이션을 관리합니다.</div>
                            </div>
                        </label>
                    </div>

                    <div className='text-3xl mt-32 mb-10 bg-slate-600 p-4 rounded-md'>테마 설정</div>

                    <div>
                        <input className='hidden peer' id='theme-option' type='checkbox' />
                        <label
                            className='
                        inline-flex items-center justify-between w-fit
                        p-5 text-gray-500 bg-header-text
                        rounded-lg cursor-pointer peer-checked:bg-slate-950 peer-checked:text-white hover:text-gray-600'
                            htmlFor='theme-option'
                        >
                            <div className='block'>
                                <div className='w-full text-3xl font-semibold'>테마 색상 변경</div>
                                <div className='w-full text-2xl'>현재 테마 : Dark</div>
                            </div>
                        </label>
                    </div>
                    <button className='bg-indigo-400 mt-32 text-3xl hover:bg-indigo-600 rounded-md w-fit p-4 transition'>저장</button>
                </div>
            </PageContainer>
        </>
    );
};

export default Setting;
