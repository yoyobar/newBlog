'use client';
import Image from 'next/image';

interface BlurredImageProps {
    src: string;
    width: number;
    height: number;
    alt: string;
    className?: string;
    onClick?: () => void;
}

const BlurredImage = ({ src, width, height, alt, className, onClick }: BlurredImageProps) => {
    return (
        <Image
            className={className}
            src={src}
            width={width}
            height={height}
            alt={alt}
            onClick={onClick ? onClick : undefined}
            loading="lazy"
        />
    );
};

export default BlurredImage;
