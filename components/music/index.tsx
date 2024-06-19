'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import { FaPause } from 'react-icons/fa6';
import { IoMdVolumeHigh, IoMdVolumeOff } from 'react-icons/io';
import { fetchDetailItems, fetchPlaylistItems, formatTime } from '@/lib/fetchMusic';
import { PlaylistItem } from '@/config/types';
import { motion } from 'framer-motion';
import { useMaximize } from '@/config/store';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: (() => void) | null;
        YT: any;
    }
}

const MusicContainer = () => {
    //? PLAYER DATA STATE
    const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
    const [selectItem, setSelectItem] = useState<PlaylistItem | null>(null);

    //? CONTROLLER DATA STATE
    const [duration, setDuration] = useState<number>(0);
    const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState<number>(0);
    const [playerState, setPlayerState] = useState<'playing' | 'paused' | 'ended'>('paused');
    const [paused, setPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [volume, setVolume] = useState(50);
    const [isPlayerReady, setPlayerReady] = useState(false);

    //? ETC DATA
    const playerRef = useRef<YT.Player | null>(null);
    const { data } = useMaximize();

    //! STATE HANDLER (youtube status 추적)
    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
        const state = event.data;
        switch (state) {
            case YT.PlayerState.PLAYING:
                setPlayerState('playing');
                break;
            case YT.PlayerState.PAUSED:
                setPlayerState('paused');
                break;
            case YT.PlayerState.ENDED:
                setPlayerState('ended');
                break;
            default:
                break;
        }
    };

    //! INIT

    //? 1. DATA INIT
    useEffect(() => {
        async function fetchDataInit() {
            const data = await fetchPlaylistItems();
            if (!data) throw Error('No PlayList Data');
            setPlaylistItems(data.items);
            setSelectItem(data.items[0]);
            console.log('1. 기본 배열 로드완료');
        }

        fetchDataInit();
    }, []);

    //? 2. DETAIL INIT
    useEffect(() => {
        async function fetchDataInit() {
            if (!selectItem) return;
            const data = await fetchDetailItems(selectItem.snippet.resourceId.videoId);
            if (!data) throw Error('No DetailList Data');
            setDuration(data);
            console.log('2. 디테일 리스트 로드완료');
        }

        fetchDataInit();
    }, [selectItem]);

    //? 3. YOUTUBE PLAYER INIT
    useEffect(() => {
        function loadYouTubeAPI() {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            document.body.appendChild(script);

            window.onYouTubeIframeAPIReady = () => {
                setPlayerReady(true);
            };
        }

        if (!window.YT) {
            loadYouTubeAPI();
        } else {
            setPlayerReady(true);
        }

        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, []);

    useEffect(() => {
        if (isPlayerReady && duration) {
            console.log('3. 유튜브 플레이어 초기화');

            if (!playerRef.current) {
                playerRef.current = new window.YT.Player('player', {
                    height: '360',
                    width: '640',
                    events: {
                        onStateChange: onPlayerStateChange,
                    },
                });
            }
        }
    }, [isPlayerReady, duration]);

    //! Controller

    //? SELECT
    const selectHandler = (item: PlaylistItem) => {
        if (!playerRef.current) return;
        if (!selectItem) return;

        const currIndex = playlistItems.indexOf(item);
        setCurrentPlaylistIndex(currIndex);
        setCurrentTime(0);
        setSelectItem(item);

        playerRef.current.loadVideoById(item.snippet.resourceId.videoId);
        playerRef.current.playVideo();
    };

    //? PLAY
    const playHandler = () => {
        if (!playerRef.current) return;
        if (!selectItem) return;

        if (paused) {
            playerRef.current.playVideo();
            setPlayerState('playing');
        } else {
            playerRef.current.loadVideoById(selectItem.snippet.resourceId.videoId);
            playerRef.current.playVideo();
        }
    };

    //? PAUSE
    const pauseHandler = () => {
        if (!playerRef.current) return;
        if (!selectItem) return;

        playerRef.current.pauseVideo();
        setPlayerState('paused');
        setPaused(true);
    };

    //? TIME CONTROLLER
    const progressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (playerRef.current) {
            playerRef.current.seekTo(time, true);
            setCurrentTime(time);
        }
    };

    //? NEXT MUSIC
    const playNextHandler = useCallback(() => {
        if (!playerRef.current) return;
        if (!selectItem) return;
        setCurrentTime(0);

        let nextIndex;
        if (currentPlaylistIndex < playlistItems.length - 1) {
            nextIndex = currentPlaylistIndex + 1;
        } else {
            nextIndex = 0;
        }
        const nextItem = playlistItems[nextIndex];
        setSelectItem(nextItem);
        setCurrentPlaylistIndex(nextIndex);

        playerRef.current.loadVideoById(nextItem.snippet.resourceId.videoId);
        playerRef.current.playVideo();
    }, [currentPlaylistIndex, playlistItems, selectItem]);

    //? PREVIOUS MUSIC
    const playPreviousHandler = () => {
        if (!playerRef.current) return;
        if (!selectItem) return;
        setCurrentTime(0);

        let previousIndex;
        if (currentPlaylistIndex > 0) {
            previousIndex = currentPlaylistIndex - 1;
        } else {
            previousIndex = playlistItems.length - 1;
        }
        const previousItem = playlistItems[previousIndex];
        setSelectItem(previousItem);
        setCurrentPlaylistIndex(previousIndex);

        playerRef.current.loadVideoById(previousItem.snippet.resourceId.videoId);
        playerRef.current.playVideo();
    };

    //? VOLUME CONTROL
    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.setVolume(volume);
        }
    }, [volume]);

    //! VIEWER

    //? Progress Bar
    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && playerState === 'playing') {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 1000);

        if (playerState === 'ended') {
            setCurrentTime(0);
            setPlayerState('playing');

            playNextHandler();
        }

        return () => clearInterval(interval);
    }, [playerState, playNextHandler]);
    return (
        <div className='flex w-full h-full select-none'>
            <div className='w-full xl:w-1/2 h-full'>
                {selectItem && (
                    <>
                        <div
                            className='h-full min-w-[100%] xl:min-w-[50%] bg-cover absolute opacity-15'
                            style={{ backgroundImage: `url(${selectItem.snippet.thumbnails.high.url})` }}
                        >
                            <div className='w-full h-full'></div>
                        </div>

                        <div className='relative w-full h-full flex flex-col items-center justify-center mt-[20%] px-20'>
                            <motion.div
                                animate={{
                                    translateY: playerState === 'playing' ? [0, 5, 0] : [0, 0],
                                    opacity: playerState === 'playing' ? [0.7, 1, 0.7] : [1, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className='w-[240px] h-[240px] bg-cover rounded-full border-4 border-white shadow-sm shadow-white'
                                style={{ backgroundImage: `url(${selectItem.snippet.thumbnails.medium.url})` }}
                            ></motion.div>

                            <input
                                type='range'
                                className='slider-progress h-8 w-full accent-white mt-8'
                                min={0}
                                max={duration}
                                step={1}
                                value={currentTime}
                                onChange={progressHandler}
                            />
                            <div className='w-full flex justify-between text-white'>
                                <div className=''>{formatTime(currentTime)}</div>
                                <div>{formatTime(duration)}</div>
                            </div>

                            <div className='p-8 text-white text-4xl h-[100px] md:h-[80px] mt-6'>{selectItem.snippet.title}</div>
                            <div className='flex flex-col justify-between items-center mt-8 text-white'>
                                <div className='w-[150px] flex justify-between items-center'>
                                    <motion.button whileHover={{ opacity: 0.6 }} onClick={playPreviousHandler}>
                                        <IoPlaySkipBack className='text-6xl' />
                                    </motion.button>

                                    {playerState === 'playing' && (
                                        <motion.button whileHover={{ opacity: 0.6 }} onClick={pauseHandler}>
                                            <FaPause className='text-6xl' />
                                        </motion.button>
                                    )}
                                    {playerState !== 'playing' && (
                                        <motion.button whileHover={{ opacity: 0.6 }} onClick={playHandler}>
                                            <FaPlay className='text-5xl' />
                                        </motion.button>
                                    )}

                                    <motion.button whileHover={{ opacity: 0.6 }} onClick={playNextHandler}>
                                        <IoPlaySkipForward className='text-6xl' />
                                    </motion.button>
                                </div>
                                <div className='flex gap-4 mt-2'>
                                    {volume ? <IoMdVolumeHigh className='text-5xl' /> : <IoMdVolumeOff className='text-5xl' />}

                                    <input
                                        className='accent-white '
                                        type='range'
                                        value={volume}
                                        onChange={(e) => setVolume(Number(e.target.value))}
                                    ></input>
                                </div>
                            </div>
                            <div className='hidden' id='player'></div>
                        </div>
                    </>
                )}
            </div>
            <>
                <nav className='w-1/2 relative h-full flex-col hidden xl:flex'>
                    <div className='fixed h-fit w-full'>
                        <h1 className='mx-4 mt-8 text-white text-4xl font-normal m-0 p-0'>Play List</h1>
                        <div className='mx-4 text-gray-400 text-2xl mb-8'>
                            유튜브로 재생되므로 유튜브 프리미엄이 있어야 광고가 나오지 않습니다.
                        </div>
                    </div>
                    <div className={`${data ? 'h-[700px]' : 'h-[700px]'} mt-[100px] overflow-y-scroll`}>
                        {playlistItems.map((item) => (
                            <motion.div
                                onClick={() => selectHandler(item)}
                                className=' cursor-pointer p-4 flex items-center gap-8 hover:bg-slate-100 text-white hover:text-black'
                                key={item.id}
                            >
                                <div
                                    className='min-w-[180px] min-h-[100px] bg-cover rounded-md'
                                    style={{ backgroundImage: `url(${item.snippet.thumbnails.medium.url})` }}
                                ></div>

                                <div className=''>{item.snippet.title}</div>
                            </motion.div>
                        ))}
                    </div>
                </nav>
            </>
        </div>
    );
};

export default MusicContainer;
