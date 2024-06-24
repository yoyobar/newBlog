'use client';

import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { LOADING_ENUM } from '@/config/types';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const formatTime = (date: Date) => {
    const formattedDate = dayjs(date);

    const month = formattedDate.format('MM');
    const day = formattedDate.format('DD');
    const week = formattedDate.format('ddd');
    const ampm = formattedDate.format('A');
    const hour = formattedDate.format('hh');
    const minute = formattedDate.format('mm');

    return `${month}월 ${day}일 (${week}) ${ampm} ${hour}:${minute}`;
};

const Clock = () => {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const newTime = formatTime(new Date());
            if (newTime !== time) {
                setTime(newTime);
            }
        }, 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, [time]);

    return (
        <div>
            <div>{time === '' && <Loading type={LOADING_ENUM.SMALL} />}</div>
            <div className='ml-2'>{time && time}</div>
        </div>
    );
};

export default Clock;
