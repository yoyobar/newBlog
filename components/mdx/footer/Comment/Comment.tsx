'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Comment, CommentFormType } from '@/config/types';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import {
    editComments,
    getComments,
    removeComments,
    setComments,
} from '@/lib/commentParse';
import CommentAdmin from './CommentAdmin';
import CommentUser from './CommentUser';
import { CommentDelete, CommentEdit } from './CommentController';
dayjs.extend(utc);

const CommentComponent = () => {
    const path = usePathname();
    const deleteRef = useRef<HTMLInputElement>(null);
    const editRef = useRef<HTMLTextAreaElement>(null);
    const [comments, setComment] = useState<Comment[]>([]);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [editContent, setEditContent] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [form, setForm] = useState<CommentFormType>({
        name: 'ㅇㅇ',
        password: '',
        path: path,
        content: '',
    });
    const [formAlert, setFormAlert] = useState({
        name: false,
        password: false,
    });
    const sortedComments = comments.sort((a: Comment, b: Comment) => {
        return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
    });

    useEffect(() => {
        const getComment = async () => {
            const data = await getComments(path);
            if (data) {
                setComment(data);
            }
        };

        getComment();
    }, [path, comments]);

    useEffect(() => {
        if (deleteVisible) {
            deleteRef.current?.focus();
        }
    }, [deleteVisible]);

    useEffect(() => {
        if (editVisible) {
            editRef.current?.focus();
            const length = editRef.current?.value.length;
            editRef.current?.setSelectionRange(length!, length!);
        }
    }, [editVisible]);

    const formChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        setFormAlert({ name: false, password: false });
    };

    const submitHandler = (
        e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLTextAreaElement>
    ) => {
        e.preventDefault();

        if (form.name.trim() === '' || form.name.trim().length <= 1)
            return setFormAlert((prev) => ({ ...prev, name: true }));
        if (form.password.trim() === '' || form.password.length <= 3)
            return setFormAlert((prev) => ({ ...prev, password: true }));
        if (form.content.trim() === '') return;

        setComments(form);
        setForm((prev) => ({ ...prev, name: '', password: '', content: '' }));
    };

    const deleteHandler = () => {
        removeComments(path, deletePassword, currentId);
    };
    const editSubmitHandler = (
        e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLInputElement>
    ) => {
        e.preventDefault();

        editComments(path, editContent, deletePassword, currentId);
        setEditVisible(false);
        setDeletePassword('');
    };

    return (
        <>
            <CommentForm
                onSubmit={submitHandler}
                onFormChange={formChangeHandler}
                form={form}
                formAlert={formAlert}
            />
            <div className='w-full h-fit flex flex-col'>
                {sortedComments.length === 0 ? (
                    <div className='w-full text-center'>현재 댓글이 없습니다.</div>
                ) : (
                    sortedComments.map((comment) =>
                        comment.admin ? (
                            <CommentAdmin
                                comment={comment}
                                setDeleteVisible={setDeleteVisible}
                                setCurrentId={setCurrentId}
                                setEditVisible={setEditVisible}
                                setEditContent={setEditContent}
                                key={comment.id}
                            />
                        ) : (
                            <CommentUser
                                comment={comment}
                                setDeleteVisible={setDeleteVisible}
                                setCurrentId={setCurrentId}
                                setEditVisible={setEditVisible}
                                setEditContent={setEditContent}
                                key={comment.id}
                            />
                        )
                    )
                )}
                {deleteVisible && (
                    <CommentDelete
                        onDelete={deleteHandler}
                        deletePassword={deletePassword}
                        setDeleteVisible={setDeleteVisible}
                        setDeletePassword={setDeletePassword}
                        deleteRef={deleteRef}
                    />
                )}
                {editVisible && (
                    <CommentEdit
                        editContent={editContent}
                        onEditSubmit={editSubmitHandler}
                        setEditVisible={setEditVisible}
                        setEditContent={setEditContent}
                        setDeleteVisible={setDeleteVisible}
                        setDeletePassword={setDeletePassword}
                        deletePassword={deletePassword}
                        editRef={editRef}
                    />
                )}
            </div>
        </>
    );
};

export default CommentComponent;