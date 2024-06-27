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
        <span className='inline-block w-[700px] h-[480px] relative'>
            <ExportedImage
                fill
                sizes='(max-width: 768px) 100vw, 600px'
                src={src}
                alt={alt}
                className='object-contain transition-maximize my-6 rounded-md border'
            />
        </span>
    );
};

export const Preview = () => {};
