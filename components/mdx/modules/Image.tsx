'use client';

import ExportedImage from 'next-image-export-optimizer';
import { useState } from 'react';
import { RiZoomInFill } from 'react-icons/ri';

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
                src={src}
                alt={alt}
                onClick={() => {
                    setZoom((prev) => !prev);
                }}
                className={`${
                    zoom
                        ? 'w-[800px] cursor-zoom-out shadow-lg shadow-darkInner-border dark:shadow-whiteInner-border'
                        : 'w-[500px] cursor-zoom-in'
                } transition-width-height my-6 rounded-md border`}
            />
        </>
    );
};

export const Preview = () => {};
