'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Dock = () => {
    enum DataType {
        WIKI = 'Wiki',
        CALENDAR = 'Calendar',
        COMMENTS = 'Comments',
        SETTING = 'Setting',
    }

    const dockData = [
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
            text: 'Wiki',
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg',
            text: 'Calendar',
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg',
            text: 'Comments',
        },
        {
            src: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Windows_Settings_icon.svg',
            text: 'Setting',
        },
    ];

    const router = useRouter();

    const selectHandler = (select: string) => {
        switch (select) {
            case DataType.WIKI:
                router.push('/post');
                break;
            case DataType.CALENDAR:
                router.push('/calendar');

                break;
            case DataType.COMMENTS:
                router.push('/comment');

                break;
            case DataType.SETTING:
                router.push('/option');
                break;
        }
    };

    return (
        <>
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
                    <div
                        onClick={() => {
                            selectHandler(item.text);
                        }}
                        className='relative hover:scale-[175%] hover:z-10 transition'
                        key={item.text}
                    >
                        <Image src={item.src} alt={item.text} width={50} height={50}></Image>
                        <p className='text-header-text text-center p-2 font-bold ml-6 absolute top-[50%] left-[100%] translate-y-[-50%] rounded-md bg-header text-xl'>
                            {item.text}
                        </p>
                    </div>
                ))}
            </nav>
        </>
    );
};

export default Dock;