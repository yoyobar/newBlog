'use client';

export function Preview({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className='text-sky-700 dark:text-slate-200 font-bold pl-2 pb-2'>Preview</div>
            <div className={`p-2 border w-full rounded-md text-black dark:text-white dark:border-[#1e191e]  dark:bg-[#362e36]`}>
                {children}
            </div>
        </>
    );
}
