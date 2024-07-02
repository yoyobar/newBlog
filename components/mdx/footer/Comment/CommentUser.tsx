import dayjs from 'dayjs';
import React from 'react';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import { FaTrash } from 'react-icons/fa';
import { HiPencil } from 'react-icons/hi2';
import { Comment } from '@/config/types';
dayjs.locale('ko');
dayjs.extend(utc);

type CommentUserProps = {
    comment: Comment;
    setDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentId: React.Dispatch<React.SetStateAction<string>>;
    setEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setEditContent: React.Dispatch<React.SetStateAction<string>>;
};

const CommentUser = ({
    comment,
    setDeleteVisible,
    setCurrentId,
    setEditVisible,
    setEditContent,
}: CommentUserProps) => {
    return (
        <>
            <div className='relative flex w-[95%] xl:w-[70%] flex-col px-10 py-4 rounded-t-2xl dark:bg-gray-700 bg-gray-100'>
                <div className='absolute bg-gray-100 dark:bg-gray-700 rounded-bl-xl  w-[30px] h-[10px] -left-3 top-1'></div>
                <div className='flex gap-4'>
                    <div className='bg-teal-400 dark:bg-rose-700 p-2 rounded-xl text-white'>
                        {comment.name}
                    </div>
                </div>
                <div className='whitespace-pre-line mt-4 mb-4 text-2xl md:text-3xl dark:text-white'>
                    {comment.content}
                </div>
            </div>
            <div className='mb-10 w-[95%] xl:w-[70%] flex items-center gap-2 rounded-b-full px-10 py-1 bg-blue-400 dark:bg-sky-700 text-2xl text-white'>
                <div>
                    {dayjs.utc(comment.created_at).local().format('YYYY.MM.DD A HH:mm')}
                </div>
                <FaTrash
                    title='댓글 삭제'
                    className='hover:text-gray-300 cursor-pointer'
                    id={comment.id}
                    onClick={(e) => {
                        setDeleteVisible(true);
                        setCurrentId(e.currentTarget.id);
                    }}
                />

                <HiPencil
                    title='댓글 수정'
                    className='hover:text-gray-300 cursor-pointer'
                    id={comment.id}
                    onClick={(e) => {
                        setEditVisible(true);
                        setEditContent(comment.content);
                        setCurrentId(e.currentTarget.id);
                    }}
                />
                <div className='flex-grow gap-2 justify-end hidden lg:flex'>
                    <div>수정 : </div>
                    <div>
                        {dayjs
                            .utc(comment.updated_at)
                            .local()
                            .format('YYYY.MM.DD A HH:mm')}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentUser;
