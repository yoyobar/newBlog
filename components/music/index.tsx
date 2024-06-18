'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoPlaySkipForward } from 'react-icons/io5';
import { IoPlaySkipBack } from 'react-icons/io5';
import { FaPause } from 'react-icons/fa6';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: { (): void } | null;
    }
}

interface PlaylistItem {
    snippet: {
        title: string;
        description: string;
        resourceId: {
            videoId: string;
        };
        thumbnails: {
            default: {
                url: string;
            };
            medium: {
                url: string;
            };
            high: {
                url: string;
            };
        };
    };
    id: string;
    etag: string;
}

interface PlaylistResponse {
    items: PlaylistItem[];
}

const parseISODuration = (duration: string) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
};

const MusicContainer = () => {
    const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
    const [selectItem, setSelectItem] = useState<PlaylistItem | null>(null);
    const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState<number>(0);
    const [playerState, setPlayerState] = useState<'playing' | 'paused' | 'ended'>('paused');
    const playerRef = useRef<YT.Player | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        async function fetchVideoDuration(videoId: string) {
            try {
                const response = await fetch(`/api/playdetail?videoId=${videoId}`);
                if (!response.ok) {
                    throw new Error(`Error fetching video duration: ${response.statusText}`);
                }
                const data = await response.json();
                const videoDuration = parseISODuration(data.items[0].contentDetails.duration);
                setDuration(videoDuration);
            } catch (error) {
                console.error(error);
            }
        }
        if (selectItem) {
            fetchVideoDuration(selectItem.snippet.resourceId.videoId);
        }
    }, [selectItem]);

    useEffect(() => {
        async function fetchPlaylistItems() {
            try {
                const response = await fetch('../api/playlist');
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const data: PlaylistResponse = await response.json();
                setPlaylistItems(data.items);
                setSelectItem(data.items[0]);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPlaylistItems();
    }, []);

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

    const initializePlayer = useCallback(() => {
        if (window.YT && !playerRef.current) {
            console.log('Initializing YouTube Player');
            playerRef.current = new window.YT.Player('player', {
                height: '360',
                width: '640',
                events: {
                    onStateChange: onPlayerStateChange,
                },
            });
        }
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;

        const onScriptLoad = () => {
            console.log('YouTube Player API script loaded');
            if (window.YT && typeof window.YT.Player === 'function') {
                initializePlayer();
            } else window.onYouTubeIframeAPIReady = initializePlayer;
        };

        script.addEventListener('load', onScriptLoad);

        document.body.appendChild(script);
        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, [initializePlayer]);

    const playVideo = useCallback((videoId: string) => {
        if (playerRef.current) {
            playerRef.current.loadVideoById(videoId);
            playerRef.current.playVideo();
        }
    }, []);

    const pauseVideo = useCallback(() => {
        if (playerRef.current) {
            playerRef.current.pauseVideo();
        }
    }, []);

    const playNext = useCallback(() => {
        if (currentPlaylistIndex < playlistItems.length - 1) {
            const nextIndex = currentPlaylistIndex + 1;
            setSelectItem(playlistItems[nextIndex]);
            setCurrentPlaylistIndex(nextIndex);
            playVideo(playlistItems[nextIndex].snippet.resourceId.videoId);
        } else {
            setSelectItem(playlistItems[0]);
            setCurrentPlaylistIndex(0);
            playVideo(playlistItems[0].snippet.resourceId.videoId);
        }
    }, [currentPlaylistIndex, playlistItems, playVideo]);

    const playPrevious = useCallback(() => {
        if (currentPlaylistIndex > 0) {
            const previousIndex = currentPlaylistIndex - 1;
            setSelectItem(playlistItems[previousIndex]);
            setCurrentPlaylistIndex(previousIndex);
            playVideo(playlistItems[previousIndex].snippet.resourceId.videoId);
        } else {
            setSelectItem(playlistItems[playlistItems.length - 1]);
            setCurrentPlaylistIndex(playlistItems.length - 1);
            playVideo(playlistItems[playlistItems.length - 1].snippet.resourceId.videoId);
        }
    }, [currentPlaylistIndex, playlistItems, playVideo]);

    const selectVideo = (item: PlaylistItem) => {
        playVideo(item.snippet.resourceId.videoId);
        setSelectItem(item);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && playerState === 'playing') {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [playerState]);

    return (
        <div className='flex w-full h-full'>
            <div className='w-full xl:w-1/2 h-full'>
                {selectItem && (
                    <>
                        <div
                            className='h-full min-w-[100%] xl:min-w-[50%] bg-cover absolute opacity-15'
                            style={{ backgroundImage: `url(${selectItem.snippet.thumbnails.high.url})` }}
                        ></div>

                        <div className='relative w-full h-full flex flex-col items-center justify-center mt-[20%] gap-8 px-20'>
                            <div
                                className='w-[240px] h-[240px] bg-cover rounded-full border-4 border-white shadow-sm shadow-white'
                                style={{ backgroundImage: `url(${selectItem.snippet.thumbnails.medium.url})` }}
                            ></div>
                            <div className='slider-container mt-4 w-full h-2 bg-gray-400 rounded'>
                                <div
                                    className='slider-progress h-2 bg-red-500 rounded'
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                ></div>
                            </div>
                            <div className='p-8 text-white text-4xl h-[100px] md:h-[80px]'>{selectItem.snippet.title}</div>
                            <div className='w-[150px] flex justify-between items-center mt-4 text-white'>
                                <button onClick={playPrevious}>
                                    <IoPlaySkipBack className='text-6xl' />
                                </button>
                                {playerState === 'playing' && (
                                    <button onClick={pauseVideo}>
                                        <FaPause className='text-6xl' />
                                    </button>
                                )}
                                {playerState === 'paused' && (
                                    <button onClick={() => playVideo(selectItem.snippet.resourceId.videoId)}>
                                        <FaPlay className='text-5xl' />
                                    </button>
                                )}
                                <button onClick={playNext}>
                                    <IoPlaySkipForward className='text-6xl' />
                                </button>
                            </div>
                            <div className='hidden' id='player'></div>
                        </div>
                    </>
                )}
            </div>
            <nav className='overflow-y-auto w-1/2 h-full flex-col hidden xl:flex cursor-pointer select-none'>
                <h1 className='mt-8 text-white text-4xl font-normal m-0 p-0'>Play List</h1>
                <div className='text-gray-400 text-2xl mb-8'>유튜브로 재생되므로 유튜브 프리미엄이 있어야 광고가 나오지 않습니다.</div>
                {playlistItems.map((item) => (
                    <div
                        onClick={() => selectVideo(item)}
                        className='p-4 flex items-center gap-8 hover:bg-slate-100 text-white hover:text-black'
                        key={item.id}
                    >
                        <div
                            className='min-w-[180px] min-h-[100px] bg-cover rounded-md'
                            style={{ backgroundImage: `url(${item.snippet.thumbnails.medium.url})` }}
                        ></div>

                        <div className=''>{item.snippet.title}</div>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default MusicContainer;
