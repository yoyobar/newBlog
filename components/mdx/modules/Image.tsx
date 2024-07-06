'use client';

import { CDN } from '@/config/const';
import ExportedImage from 'next-image-export-optimizer';
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
            <ExportedImage
                width={500}
                height={332}
                src={CDN + src}
                alt={alt}
                onClick={() => {
                    setZoom((prev) => !prev);
                }}
                className={`${
                    zoom ? 'w-[800px] cursor-zoom-out' : 'w-[500px] cursor-zoom-in'
                } transition-width-height my-6 rounded-md shadow-xl`}
            />
        </>
    );
};

export const Preview = () => {};
