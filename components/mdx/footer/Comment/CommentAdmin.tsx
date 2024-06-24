import dayjs from 'dayjs';
import React from 'react';
import utc from 'dayjs/plugin/utc';
import { FaCommentSlash } from 'react-icons/fa';
import { BiCommentEdit } from 'react-icons/bi';
import { Comment } from '@/config/types';
import { RiVipCrownFill } from 'react-icons/ri';
dayjs.extend(utc);

type CommentAdminProps = {
    comment: Comment;
    setDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentId: React.Dispatch<React.SetStateAction<string>>;
    setEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setEditContent: React.Dispatch<React.SetStateAction<string>>;
};

const CommentAdmin = ({
    comment,
    setDeleteVisible,
    setCurrentId,
    setEditVisible,
    setEditContent,
}: CommentAdminProps) => {
    return (
        <>
            <div className='self-end relative flex w-[95%] xl:w-[70%] flex-col right-0 px-10 py-4 rounded-t-2xl bg-gray-800 text-white'>
                <div className='absolute bg-gray-800 rounded-br-xl  w-[30px] h-[10px] -right-2 top-1'></div>
                <div className='flex gap-4'>
                    <div className='bg-indigo-600 p-2 rounded-xl text-white'>
                        <div className='flex gap-2'>
                            Admin
                            <RiVipCrownFill />
                        </div>
                    </div>
                </div>
                <div className='mt-4 mb-4 text-2xl md:text-3xl'>{comment.content}</div>
            </div>
            <div className='self-end mb-10 w-[95%] xl:w-[70%] flex items-center gap-2 rounded-b-full px-10 py-1 bg-violet-600 text-2xl text-white'>
                <div>
                    {dayjs.utc(comment.created_at).local().format('YYYY.MM.DD A HH:mm')}
                </div>
                <FaCommentSlash
                    title='댓글 삭제'
                    className='cursor-pointer'
                    id={comment.id}
                    onClick={(e) => {
                        setDeleteVisible(true);
                        setCurrentId(e.currentTarget.id);
                    }}
                />

                <BiCommentEdit
                    title='댓글 수정'
                    className='cursor-pointer'
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

export default CommentAdmin;
