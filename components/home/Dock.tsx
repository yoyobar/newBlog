'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { TiArrowMove } from 'react-icons/ti';

const Dock = () => {
    const path = usePathname();

    enum DataType {
        WIKI = 'Wiki',
        ARCHIVE = 'Archives',
        MESSAGE = 'Message',
        MUSIC = 'music',
        SETTING = 'Setting',
    }

    //? 개발 진행단계에 따라 차차 visible을 헤제하여 dock을 늘릴 예정임
    const dockData = [
        {
            src: '/icon/wiki.svg',
            text: DataType.WIKI,
        },
        {
            src: '/icon/archive.svg',
            text: DataType.ARCHIVE,
        },
        {
            src: '/icon/message.svg',
            text: DataType.MESSAGE,
        },
        {
            src: '/icon/music.svg',
            text: DataType.MUSIC,
        },
        {
            src: '/icon/setting.svg',
            text: DataType.SETTING,
        },
    ];

    const router = useRouter();

    const selectHandler = (select: string) => {
        switch (select) {
            case DataType.WIKI:
                if (path === '/posts') return router.push('/');
                router.push('/posts');
                break;
            case DataType.ARCHIVE:
                if (path === '/archives') return router.push('/');
                router.push('/archives');
                break;
            // case DataType.MESSAGE:
            //     if (path === '/message') return router.push('/');
            //     router.push('/message');
            //     break;
            case DataType.MUSIC:
                if (path === '/music') return router.push('/');
                router.push('/music');
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
                border border-[#565656] relative top-[25%] md:top-[30%] 
                left-10 px-3 py-4 rounded-3xl bg-slate-800
                w-fit shadow-sm shadow-[#3f3f3f]
                gap-5 select-none flex flex-col items-center
                '
                drag={true}
                whileDrag={{ opacity: 0.5, scale: 0.9 }}
                dragMomentum={false}
                dragPropagation={false}
            >
                <TiArrowMove className='text-slate-300 cursor-grab absolute -top-4 -left-4 text-5xl' />
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
                        {<Image className={` w-[50px] h-[50px] rounded-md`} src={item.src} alt={item.text} width={50} height={50}></Image>}
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
