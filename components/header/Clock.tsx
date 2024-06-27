'use client';

import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { LOADING_ENUM } from '@/config/types';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffectOnce } from 'react-use';

dayjs.locale('ko');

const formatTime = (date: Date) => {
    const formattedDate = dayjs(date).format('MM월 DD일 (ddd) A hh:mm');

    return formattedDate;
};

const Clock = () => {
    const [time, setTime] = useState<string>(formatTime(new Date()));

    useEffectOnce(() => {
        const timeInterval = setInterval(() => {
            const newTime = formatTime(new Date());
            if (newTime !== time) {
                setTime(newTime);
            }
        }, 1000);

        return () => {
            clearInterval(timeInterval);
        };
    });

    return (
        <div>
            <div>{time === '' && <Loading type={LOADING_ENUM.SMALL} />}</div>
            <div>{time && time}</div>
        </div>
    );
};

export default Clock;
