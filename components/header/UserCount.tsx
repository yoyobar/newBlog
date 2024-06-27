'use client';

import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import Modal from './Modal';
import { useEffectOnce } from 'react-use';
import Cookies from 'js-cookie';
import { getCookie, updateVisitCount, viewVisitCount } from '@/lib/visitorCount';

const UserCount = () => {
    const [visitCount, setVisitCount] = useState('1');
    const [focus, setFocus] = useState(false);

    useEffectOnce(() => {
        const countInit = async (type: string) => {
            if (type === 'UPDATE') {
                getCookie();
                const data = await updateVisitCount();
                setVisitCount(data);
            }
            if (type === 'VIEW') {
                const data = await viewVisitCount();
                setVisitCount(data);
            }
        };

        const cookie = Cookies.get('currentDate');

        if (!cookie) {
            countInit('UPDATE');
        } else {
            countInit('VIEW');
        }
    });

    const enterHandler = () => {
        setFocus(true);
    };
    const leaveHandler = () => {
        setFocus(false);
    };

    return (
        <>
            <div
                onMouseLeave={leaveHandler}
                onMouseEnter={enterHandler}
                className='relative flex items-center gap-2 min-w-[50px]'
            >
                <FaUser />
                <div>{visitCount}</div>
                <div className='ml-2 mr-2 h-[15px] border-r border-r-gray-300'></div>
                {focus && <Modal>하루 방문자 수</Modal>}
            </div>
        </>
    );
};

export default UserCount;
