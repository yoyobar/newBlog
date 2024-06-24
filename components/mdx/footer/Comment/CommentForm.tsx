import React, { useEffect, useState } from 'react';
import { CommentFormType } from '@/config/types';

type CommentFormProps = {
    onSubmit: (
        e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLTextAreaElement>
    ) => void;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    form: CommentFormType;
    formAlert: {
        name: boolean;
        password: boolean;
    };
};

const CommentForm = ({ onSubmit, onFormChange, form, formAlert }: CommentFormProps) => {
    const [os, setOs] = useState('Alt+Enter');

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('windows')) {
            setOs('Alt+Enter');
        } else if (userAgent.includes('mac os') || userAgent.includes('macintosh')) {
            setOs('⌘+Enter');
        } else {
            setOs('Alt+Enter');
        }
    }, []);

    return (
        <>
            <div className='animate-bounce mb-4 text-2xl lg:text-3xl text-center text-gray-600 dark:text-white'>
                댓글은 포스팅에 도움이됩니다. 적극적인 의견 감사드립니다.
            </div>
            <form
                onSubmit={onSubmit}
                className='w-full bg-gray-100 dark:bg-darkInner-border rounded-md mb-10 pt-4 px-4'
            >
                <div className='grid grid-cols-2 gap-4 p-2'>
                    <div className='flex-grow flex flex-col'>
                        <input
                            className='text-white focus:dark:text-black  dark:bg-darkInner-content dark:focus:bg-slate-100 focus:bg-slate-500 focus:placeholder:text-gray-400 placeholder:text-white transition outline-none rounded-xl py-2 px-8 bg-slate-700'
                            type='text'
                            name='name'
                            value={form.name}
                            placeholder='이름'
                            onChange={onFormChange}
                        ></input>

                        <div
                            className={`${
                                formAlert.name ? 'visible' : 'invisible'
                            } text-rose-600 text-center text-xl lg:text-2xl`}
                        >
                            이름을 2자이상 입력해주세요.
                        </div>
                    </div>
                    <div className='flex-grow flex flex-col'>
                        <input
                            className='text-white focus:dark:text-black dark:bg-darkInner-content dark:focus:bg-slate-100  focus:bg-slate-500 focus:placeholder:text-gray-400 placeholder:text-white transition w-full outline-none rounded-xl py-2 px-8 bg-slate-700'
                            type='password'
                            name='password'
                            value={form.password}
                            placeholder='비밀번호'
                            onChange={onFormChange}
                        ></input>
                        <div
                            className={`${
                                formAlert.password ? 'visible' : 'invisible'
                            } text-rose-600 text-center text-xl lg:text-2xl`}
                        >
                            비밀번호를 4자이상 입력해주세요.
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <textarea
                        onKeyUp={(e) => {
                            if (e.key === 'Enter' && e.altKey) {
                                onSubmit(e);
                            }
                        }}
                        value={form.content}
                        placeholder='내용'
                        onChange={onFormChange}
                        name='content'
                        className='dark:text-black bg-gray-100 mt-6 mb-6 w-full min-h-[130px] resize-none outline-none p-4 rounded-md'
                    ></textarea>
                    <button
                        type='submit'
                        className='hover:bg-black flex gap-1 transition w-fit bottom-12 right-6 absolute p-2 rounded-lg bg-slate-700 text-white'
                    >
                        <div className='bg-rose-600 rounded-md text-2xl'>{os}</div>
                        <div>등록</div>
                    </button>
                </div>
            </form>
        </>
    );
};

export default CommentForm;
