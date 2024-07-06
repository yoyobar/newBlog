import Image from 'next/image';
import React from 'react';

interface BlurredImageProps {
    src: string;
    sizes: string;
    className?: string;
    alt: string;
}

const BlurredImageFill = ({ src, sizes, className, alt }: BlurredImageProps) => {
    return (
        <Image
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO0rwcAAQMAwNrRf/sAAAAASUVORK5CYII="
            className={className}
            src={src}
            sizes={sizes}
            alt={alt}
            fill
        />
    );
};

export default BlurredImageFill;
