'use client';
import useOptions from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type OptionState = [boolean, boolean];

enum OptionType {
    'ANIMATION' = '0',
    'THEME' = '1',
}

const SettingPanel = () => {
    const router = useRouter();
    const { data, setData } = useOptions();
    const [option, setOption] = useState<OptionState>([true, true]);

    useEffect(() => {
        const optionData = localStorage.getItem('option');
        if (!optionData) return setOption([true, true]);

        const { state } = JSON.parse(optionData);
        setOption([state.data.animation, state.data.theme]);
    }, [data]);

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        const optionType = e.target.value;

        setOption((prev) => {
            if (optionType === OptionType.ANIMATION) {
                return [value, prev[1]];
            } else if (optionType === OptionType.THEME) {
                return [prev[0], value];
            }
            return prev;
        });
    };

    const confirmHandler = () => {
        const form = {
            animation: option[0],
            theme: option[1],
        };
        setData(form);
        router.push('/');
    };

    return (
        <div className='select-none p-10 flex flex-col text-header-text'>
            <div className='text-5xl font-bold'>홈페이지 옵션 설정</div>

            <div className='text-3xl mt-32 mb-10 bg-slate-600 p-4 rounded-md'>애니메이션 설정</div>

            <div>
                <input
                    value={OptionType.ANIMATION}
                    name='ANIMATION'
                    onChange={checkHandler}
                    checked={option[OptionType.ANIMATION]}
                    className='hidden peer'
                    id='animation-option'
                    type='checkbox'
                />
                <label
                    className='
        inline-flex items-center justify-between w-fit
        p-5 text-gray-500 bg-header-text
        rounded-lg cursor-pointer peer-checked:bg-indigo-600 peer-checked:text-white hover:text-gray-600'
                    htmlFor='animation-option'
                >
                    <div className='block'>
                        <div className='w-full text-3xl font-semibold'>애니메이션 활성화</div>
                        <div className='w-full text-2xl'>Snow 애니메이션을 관리합니다.</div>
                    </div>
                </label>
            </div>

            <div className='text-3xl mt-32 mb-10 bg-slate-600 p-4 rounded-md'>테마 설정</div>

            <div>
                <input
                    value={OptionType.THEME}
                    onChange={checkHandler}
                    checked={option[OptionType.THEME]}
                    className='hidden peer'
                    id='theme-option'
                    type='checkbox'
                />
                <label
                    className='
        inline-flex items-center justify-between w-fit
        p-5 text-gray-500 bg-header-text
        rounded-lg cursor-pointer peer-checked:bg-slate-950 peer-checked:text-white hover:text-gray-600'
                    htmlFor='theme-option'
                >
                    <div className='block'>
                        <div className='w-full text-3xl font-semibold'>테마 색상 변경</div>
                        <div className='w-full text-2xl'>현재 테마 : {option[1] ? 'Dark' : 'Light'}</div>
                    </div>
                </label>
            </div>
            <button onClick={confirmHandler} className='bg-indigo-400 mt-10 text-3xl hover:bg-indigo-600 rounded-md w-fit p-4 transition'>
                저장
            </button>
        </div>
    );
};

export default SettingPanel;
