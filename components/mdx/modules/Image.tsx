'use client';

import ExportedImage from 'next-image-export-optimizer';
import { useState } from 'react';

/* eslint-disable @next/next/no-img-element */
interface ImageProps {
    src: string;
    alt: string;
}

export const Image = ({ src, alt }: ImageProps) => {
    const [zoom, setZoom] = useState(false);
    return zoom ? (
        <ExportedImage
            width={1000}
            height={1000}
            src={src}
            alt={alt}
            onClick={() => {
                if (!zoom) return;
                setZoom(false);
            }}
            className='transition-maximize my-6 rounded-md border cursor-zoom-out'
        />
    ) : (
        <ExportedImage
            width={500}
            height={200}
            src={src}
            alt={alt}
            onClick={() => {
                if (zoom) return;
                setZoom(true);
            }}
            className='transition-maximize my-6 rounded-md border cursor-zoom-in'
        />
    );
};

export const Preview = () => {};
