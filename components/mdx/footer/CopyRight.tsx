import { siteConfig } from '@/config/siteconfig';
import { IoLogoGithub } from 'react-icons/io';
import { IoMdMail } from 'react-icons/io';
import React from 'react';
import Link from 'next/link';
const CopyRight = () => {
    return (
        <div className='flex flex-col gap-2 mb-20 mt-4'>
            <div className='flex gap-2 justify-end text-3xl'>
                <Link className='cursor-pointer' href={'https://github.com/yoyobar'}>
                    <IoLogoGithub />
                </Link>
                <Link href='mailto:barwait@naver.com' className='cursor-pointer'>
                    <IoMdMail />
                </Link>
            </div>
            <div className='flex gap-2 justify-end text-xl'>
                <div>
                    © {siteConfig.since}{' '}
                    <Link className='no-underline font-bold' href={'https://trouble-wiki.vercel.app/'}>
                        yoyobar blog
                    </Link>{' '}
                    Powered by{' '}
                    <Link className='no-underline font-bold' href={'https://nextjs.org/'}>
                        Next.js
                    </Link>
                    , by{' '}
                    <Link className='no-underline font-bold' href={'https://vercel.com/'}>
                        Vercel
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CopyRight;
