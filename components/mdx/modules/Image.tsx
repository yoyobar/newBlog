/* eslint-disable @next/next/no-img-element */
interface ImageProps {
    src: string;
    alt: string;
}

export const Image = ({ src, alt }: ImageProps) => {
    return (
        <>
            <img src={src} alt={alt} className='mx-auto mb-0 mt-8 rounded-md' />
        </>
    );
};
