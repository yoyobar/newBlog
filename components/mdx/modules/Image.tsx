'use client';

import ExportedImage from 'next-image-export-optimizer';
import { useState } from 'react';

/* eslint-disable @next/next/no-img-element */
interface ImageProps {
    src: string;
    alt: string;
}

export const Image = ({ src, alt }: ImageProps) => {
    return (
        <span className='inline-block w-full h-[320px] xl:w-[700px] xl:h-[470px] relative'>
            <ExportedImage
                fill
                sizes='(max-width: 1280px) 100vw, 700px'
                src={src}
                alt={alt}
                className='object-contain transition-maximize my-6 rounded-md border'
            />
        </span>
    );
};

export const Preview = () => {};
