const Pen = ({ src }: { src: string }) => {
    return <iframe className='rounded-md w-1/2' height='200' title='Sample' src={src} loading='lazy' />;
};

export default Pen;
