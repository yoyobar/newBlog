'use client';
import Link from 'next/link';
import Clock from './Clock';
import UserCount from './UserCount';
import { useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';
import { CDN } from '@/config/const';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const aboutHandler = () => {
        setShowMenu(false);
    };
    const githubHandler = () => {
        setShowMenu(false);
    };

    return (
        <div
            className={`bg-header text-header-text fill-header-text relative select-none w-full h-12 text-2xl font-medium flex justify-between pl-8 pr-8 items-center z-50`}
        >
            <div className="flex gap-8 h-full items-center">
                {showMenu && (
                    <div
                        className="
                    z-10 absolute w-[80px] top-14 flex gap-1 
                    flex-col items-center p-1 bg-background
                     rounded-md font-normal border border-gray-600 shadow-gray-500 shadow-sm"
                    >
                        <div onClick={aboutHandler} className="p-2 rounded-md w-full text-center hover:bg-blue-600">
                            About
                        </div>
                        <Link
                            target="_blank"
                            href="https://github.com/yoyobar"
                            onClick={githubHandler}
                            className="cursor-default p-2 rounded-md w-full text-center hover:bg-blue-600"
                        >
                            Github
                        </Link>
                    </div>
                )}
                <ExportedImage
                    onClick={() => {
                        setShowMenu(!showMenu);
                    }}
                    className={`${showMenu && 'brightness-200'} cursor-pointer hover:brightness-75 transition`}
                    width={24}
                    height={24}
                    alt="background-logo"
                    src={`${CDN}/img/main-logo.webp`}
                />
                <Link className="md:block hidden" href={'/'}>
                    Trouble Wiki
                </Link>
            </div>
            <div className="flex min-w-[220px] items-center">
                <UserCount />
                <Clock />
            </div>
        </div>
    );
};

export default Header;
