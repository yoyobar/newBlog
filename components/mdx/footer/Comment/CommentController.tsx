import React from 'react';

type CommentDeleteProps = {
    onDelete: () => void;
    deletePassword: string;
    setDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setDeletePassword: React.Dispatch<React.SetStateAction<string>>;
    deleteRef: React.RefObject<HTMLInputElement>;
};

export const CommentDelete = ({
    onDelete,
    setDeleteVisible,
    setDeletePassword,
    deletePassword,
    deleteRef,
}: CommentDeleteProps) => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center z-50'>
            <div className='text-white mb-4'>암호를 입력하세요</div>
            <input
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        onDelete();
                        setDeleteVisible(false);
                        setDeletePassword('');
                    }
                    if (e.key === 'Escape') {
                        setDeleteVisible(false);
                        setDeletePassword('');
                    }
                }}
                type='password'
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className='w-full max-w-md text-black p-2 rounded-lg bg-white'
                onBlur={() => setDeleteVisible(false)}
                ref={deleteRef}
            />
        </div>
    );
};

type CommentEditProps = {
    editContent: string;
    onEditSubmit: (
        e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLInputElement>
    ) => void;
    deletePassword: string;
    setEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setEditContent: React.Dispatch<React.SetStateAction<string>>;
    setDeletePassword: React.Dispatch<React.SetStateAction<string>>;
    editRef: React.RefObject<HTMLTextAreaElement>;
};

export const CommentEdit = ({
    editContent,
    onEditSubmit,
    setEditVisible,
    setEditContent,
    setDeleteVisible,
    setDeletePassword,
    deletePassword,
    editRef,
}: CommentEditProps) => {
    return (
        <div
            className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col gap-4 justify-center items-center z-50'
            onClick={() => setEditVisible(false)}
        >
            <div
                className='flex w-full flex-col justify-center items-center'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='text-white mb-4'>수정할 내용을 입력하세요</div>
                <form
                    autoComplete='off'
                    className='w-full flex flex-col justify-center items-center'
                    onSubmit={onEditSubmit}
                >
                    <textarea
                        onKeyUp={(e) => {
                            if (e.key === 'Escape') {
                                setDeleteVisible(false);
                                setEditContent('');
                                setDeletePassword('');
                                setEditVisible(false);
                            }
                        }}
                        ref={editRef}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className='resize-none min-w-[80%] h-[300px] max-w-md text-black p-2 rounded-lg bg-white'
                    />
                    <div className='text-white mb-4 mt-4 '>암호를 입력하세요</div>
                    <div className='flex gap-2 min-w-2/3'>
                        <input
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    onEditSubmit(e);
                                    setEditVisible(false);
                                    setDeletePassword('');
                                }
                                if (e.key === 'Escape') {
                                    setEditVisible(false);
                                    setDeletePassword('');
                                }
                            }}
                            type='password'
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            className=' text-black w-[230px] p-2 rounded-lg bg-white'
                        />
                        <button
                            type='submit'
                            className='p-2 w-fit rounded-md text-white transition bg-indigo-400 hover:bg-indigo-600'
                        >
                            제출
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
