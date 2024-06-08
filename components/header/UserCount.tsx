'use client';

import { FaUser } from 'react-icons/fa';
import React, { useState } from 'react';
import Modal from './Modal';
import { useTheme } from 'next-themes';

const UserCount = () => {
    const [focus, setFocus] = useState(false);
    const { theme } = useTheme();

    const enterHandler = () => {
        setFocus(true);
    };
    const leaveHandler = () => {
        setFocus(false);
    };

    return (
        <div onMouseLeave={leaveHandler} onMouseEnter={enterHandler} className='relative flex items-center gap-1 justify-between'>
            <FaUser />
            <div>0</div>
            <div className='ml-2 h-[15px] border-r border-r-gray-300'></div>
            {focus && <Modal>일일 방문자 수</Modal>}
        </div>
    );
};

export default UserCount;
