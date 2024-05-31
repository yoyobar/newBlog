const Modal = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='opacity-90 z-10 animate-popUp p-1 bg-header rounded-md flex justify-center absolute text-header-text -left-12 top-12 w-[100px]'>
            {children}
        </div>
    );
};

export default Modal;
