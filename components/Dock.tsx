import Image from 'next/image';
import React from 'react';
const Dock = () => {
    const dockData = [
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
            text: '위키',
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg',
            text: '캘린더',
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg',
            text: '방명록',
        },
    ];

    return (
        <nav
            className='
        border border-[#565656] z-10 absolute top-[50%] 
        left-10 px-3 py-4 rounded-3xl bg-header
        translate-y-[-40%]
        w-auto
        shadow-sm shadow-[#3f3f3f]
        flex flex-col gap-5
        select-none
        skew-y-[5deg]
        '
        >
            {dockData.map((item) => (
                <div className='relative hover:scale-[175%] hover:z-10 transition' key={item.text}>
                    <Image src={item.src} alt={item.text} width={50} height={50}></Image>
                    <p className='text-header-text w-full text-center p-2 font-bold ml-6 absolute top-[50%] left-[100%] translate-y-[-50%] rounded-md bg-header'>
                        {item.text}
                    </p>
                </div>
            ))}
        </nav>
    );
};

export default Dock;
