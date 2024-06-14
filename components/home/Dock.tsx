'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { TiArrowMove } from 'react-icons/ti';

const Dock = () => {
    const path = usePathname();

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
                if (path === '/posts') return router.push('/');
                router.push('/posts');
                break;
            case DataType.CALENDAR:
                if (path === '/calendar') return router.push('/');
                router.push('/calendar');
                break;
            case DataType.COMMENTS:
                if (path === '/comment') return router.push('/');
                router.push('/comment');
                break;
            case DataType.SETTING:
                if (path === '/setting') return router.push('/');
                router.push('/setting');
                break;
        }
    };
    return (
        <>
            <motion.div
                className='
                border border-[#565656] relative top-[40%] 
                left-10 px-3 py-4 rounded-3xl bg-header
                w-fit shadow-sm shadow-[#3f3f3f]
                gap-5 select-none skew-y-[5deg] flex flex-col items-center
                '
                drag={true}
                whileDrag={{ opacity: 0.5, scale: 0.9 }}
                dragMomentum={false}
                dragPropagation={false}
            >
                <TiArrowMove className='text-header-text cursor-grab absolute -top-4 -left-4 text-5xl' />
                {dockData.map((item) => (
                    <motion.div
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 2, transition: { duration: 0.2 } }}
                        onClick={() => {
                            selectHandler(item.text);
                        }}
                        className='relative hover:z-10 mt-4'
                        key={item.text}
                    >
                        <Image className='w-[50px] h-[50px]' src={item.src} alt={item.text} width={50} height={50}></Image>
                        <p className='text-header-text text-center p-2 font-bold ml-6 absolute top-[50%] left-[100%] translate-y-[-50%] rounded-md bg-header text-xl'>
                            {item.text}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
};

export default Dock;
