'use client';
import Link from 'next/link';
import Clock from './Clock';
import Image from 'next/image';
import UserCount from './UserCount';
import { useState } from 'react';
import useAnimation from '@/store';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { running, onToggle } = useAnimation();

    const animationHandler = () => {
        onToggle();
        setShowMenu(false);
    };

    const aboutHandler = () => {
        setShowMenu(false);
    };
    const githubHandler = () => {
        setShowMenu(false);
    };

    return (
        <div className='relative select-none w-full h-12 bg-header text-header-text text-2xl font-medium flex justify-between pl-8 pr-8 items-center'>
            <div className='flex gap-8 h-full items-center'>
                {showMenu && (
                    <div
                        className='
                    z-10 absolute w-[160px] top-14 flex gap-1 
                    flex-col justify-center items-center p-1 bg-background
                     rounded-md font-normal border border-gray-600 shadow-gray-500 shadow-sm'
                    >
                        <div onClick={aboutHandler} className='p-2 rounded-md w-full text-center hover:bg-blue-600'>
                            About Me
                        </div>
                        <div onClick={animationHandler} className='p-2 rounded-md w-full text-center hover:bg-blue-600'>
                            Turn <span>{running ? 'OFF' : 'ON'}</span> Animation
                        </div>
                        <Link
                            target='_blank'
                            href='https://github.com/yoyobar'
                            onClick={githubHandler}
                            className='cursor-default p-2 rounded-md w-full text-center hover:bg-blue-600'
                        >
                            Github
                        </Link>
                    </div>
                )}
                <Image
                    onClick={() => {
                        setShowMenu(!showMenu);
                    }}
                    className='cursor-pointer hover:brightness-75 transition'
                    width={24}
                    height={24}
                    alt='background-logo'
                    src={'/logo/main-logo.png'}
                />
                <Link href={'/'}>Trouble Wiki</Link>
            </div>
            <div className='flex gap-2 items-center justify-between min-w-[220px]'>
                <UserCount />
                <div className='h-[15px] border-r border-r-gray-300'></div>
                <Clock />
            </div>
        </div>
    );
};

export default Header;
