'use client';

export function Preview({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className='text-sky-700 dark:text-slate-200 font-bold pl-2 pb-2'>Preview</div>
            <div
                className={`w-full md:w-[60%] p-10 flex flex-col gap-2 border rounded-md text-black dark:text-header-text dark:border-[#3a4150]  dark:bg-[#1f1f1f]`}
            >
                {children}
            </div>
        </>
    );
}
