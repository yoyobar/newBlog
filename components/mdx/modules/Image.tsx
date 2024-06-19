import ExportedImage from 'next-image-export-optimizer';

/* eslint-disable @next/next/no-img-element */
interface ImageProps {
    src: string;
    alt: string;
}

export const Image = ({ src, alt }: ImageProps) => {
    return (
        <>
            <ExportedImage
                width={400}
                height={300}
                src={src}
                alt={alt}
                className='my-6 rounded-md border p-2 dark:border-darkInner-border'
            />
        </>
    );
};
