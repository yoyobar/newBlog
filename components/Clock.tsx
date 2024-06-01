'use client';

import { useEffect, useMemo, useState } from 'react';

const formatTime = (date: Date) => {
    //? 월 일 시 분 데이터
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    //? 요일 데이터
    const weeks = ['일', '월', '화', '수', '목', '금', '토'];
    const week = weeks[date.getDay()];
    //? AM/PM 데이터
    const ampm = Number(hour) >= 12 ? '오후' : '오전';

    return `${month}월 ${day}일 (${week}) ${ampm} ${hour}:${minute}`;
};

const Clock = () => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        setTime(new Date());
    }, []);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timeInterval);
    }, []);

    const timeData = useMemo(() => formatTime(time), [time]);

    return (
        <div>
            <div>{timeData}</div>
        </div>
    );
};

export default Clock;
