'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { FaPlay } from 'react-icons/fa';
import { IoPlaySkipForward, IoPlaySkipBack } from 'react-icons/io5';
import { FaPause } from 'react-icons/fa6';
import { IoMdVolumeHigh, IoMdVolumeOff } from 'react-icons/io';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: (() => void) | null;
        YT: any;
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
    const [paused, setPaused] = useState(false);
    const playerRef = useRef<YT.Player | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState(50);
    const [isLoading, setLoading] = useState(true);
    const [isPlayerReady, setPlayerReady] = useState(false);

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
                setLoading(false);
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
                    onReady: () => setPlayerReady(true),
                },
            });
        }
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;

        window.onYouTubeIframeAPIReady = initializePlayer;

        document.body.appendChild(script);
        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, [initializePlayer]);

    const playVideo = useCallback(
        async (videoId: string) => {
            if (paused) {
                playerRef.current?.playVideo();
                setPaused(false);
                return;
            }

            try {
                const response = await fetch(`/api/playdetail?videoId=${videoId}`);
                if (!response.ok) {
                    throw new Error(`Error fetching video duration: ${response.statusText}`);
                }
                const data = await response.json();
                const videoDuration = parseISODuration(data.items[0].contentDetails.duration);

                if (playerRef.current && typeof window.YT.Player === 'function') {
                    playerRef.current.loadVideoById(videoId);
                    playerRef.current.playVideo();
                    setDuration(videoDuration); // Update duration after video is loaded
                    return;
                }
            } catch (error) {
                console.error(error);
            }
        },
        [paused]
    );

    useEffect(() => {
        if (!isLoading && isPlayerReady && playlistItems.length > 0 && selectItem) {
            playVideo(selectItem.snippet.resourceId.videoId);
        }
    }, [isLoading, isPlayerReady, playlistItems, selectItem, playVideo]);

    const pauseVideo = useCallback(() => {
        if (playerRef.current) {
            playerRef.current.pauseVideo();
            setPaused(true);
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
        setSelectItem(item);
        playVideo(item.snippet.resourceId.videoId);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && playerState === 'playing') {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 1000);

        if (playerState === 'ended') {
            playNext();
        }

        return () => clearInterval(interval);
    }, [playerState, playNext]);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.setVolume(volume);
        }
    }, [volume]);

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (playerRef.current) {
            playerRef.current.seekTo(time, true);
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const displaySeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${displayMinutes}:${displaySeconds}`;
    };
    return (
        <div className='flex w-full h-full'>
            {isLoading ? (
                <div className='flex items-center justify-center w-full h-full'>
                    <p className='text-white mt-8'>Loading...</p>
                </div>
            ) : (
                <>
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
                                    <div
                                        className='w-[240px] h-[240px] bg-cover rounded-full border-4 border-white shadow-sm shadow-white'
                                        style={{ backgroundImage: `url(${selectItem.snippet.thumbnails.medium.url})` }}
                                    ></div>

                                    <input
                                        type='range'
                                        className='slider-progress h-8 w-full accent-white mt-8'
                                        min={0}
                                        max={duration}
                                        step={1}
                                        value={currentTime}
                                        onChange={handleSeek}
                                    />
                                    <div className='w-full flex justify-between text-white'>
                                        <div className=''>{formatTime(currentTime)}</div>
                                        <div>{formatTime(duration)}</div>
                                    </div>

                                    <div className='p-8 text-white text-4xl h-[100px] md:h-[80px] mt-6'>{selectItem.snippet.title}</div>
                                    <div className='flex flex-col justify-between items-center mt-8 text-white'>
                                        <div className='w-[150px] flex justify-between items-center'>
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
                    <nav className='w-1/2 flex-col hidden xl:flex cursor-pointer select-none'>
                        <h1 className='mt-8 text-white text-4xl font-normal m-0 p-0'>Play List</h1>
                        <div className='text-gray-400 text-2xl mb-8'>
                            유튜브로 재생되므로 유튜브 프리미엄이 있어야 광고가 나오지 않습니다.
                        </div>
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
                </>
            )}
        </div>
    );
};

export default MusicContainer;
