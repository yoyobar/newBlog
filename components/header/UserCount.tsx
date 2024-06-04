'use client';

import { Icon } from '@/utils/Icon';
import React, { useState } from 'react';
import Modal from './Modal';

const UserCount = () => {
    const [focus, setFocus] = useState(false);

    const enterHandler = () => {
        setFocus(true);
    };
    const leaveHandler = () => {
        setFocus(false);
    };

    return (
        <div
            onMouseLeave={leaveHandler}
            onMouseEnter={enterHandler}
            className='text-header-text relative fill-header-text flex items-center gap-1 justify-between'
        >
            <Icon.person_fill />
            <div>0</div>
            <div className='ml-2 h-[15px] border-r border-r-gray-300'></div>
            {focus && <Modal>일일 방문자 수</Modal>}
        </div>
    );
};

export default UserCount;
