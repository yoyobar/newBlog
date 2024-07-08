'use client';

import BlurredImage from '@/components/BlurredImage';
import { CDN } from '@/config/const';
import { useState } from 'react';

/* eslint-disable @next/next/no-img-element */
interface ImageProps {
    src: string;
    alt: string;
}

export const Image = ({ src, alt }: ImageProps) => {
    const [zoom, setZoom] = useState(false);

    return (
        <>
            <BlurredImage
                width={500}
                height={332}
                src={CDN + src}
                alt={alt}
                onClick={() => {
                    setZoom((prev) => !prev);
                }}
                className={`${
                    zoom ? 'w-[800px] cursor-zoom-out' : 'w-[500px] cursor-zoom-in'
                } transition-width-height p-0 m-0 rounded-md shadow-xl`}
            />
            <a target="_blank" href={alt} className="inline-block text-gray mb-4 text-xl no-underline">
                {alt ? alt : ''}
            </a>
        </>
    );
};

export const Preview = () => {};
