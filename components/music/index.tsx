'use client';
import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';

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

const MusicContainer = () => {
    const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
    const [selectItem, setSelectItem] = useState<PlaylistItem | null>(null);
    const playerRef = useRef<YT.Player | null>(null);

    useEffect(() => {
        console.log(selectItem);
        async function fetchVideoDuration(videoId: string) {
            try {
                const response = await fetch(`/api/playdetail?videoId=${videoId}`);
                if (!response.ok) {
                    throw new Error(`Error fetching video duration: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data);
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

    const initializePlayer = useCallback(() => {
        if (window.YT && !playerRef.current) {
            console.log('Initializing YouTube Player');
            playerRef.current = new window.YT.Player('player', {
                height: '360',
                width: '640',
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

    const selectVideo = (item: PlaylistItem) => {
        playVideo(item.snippet.resourceId.videoId);
        setSelectItem(item);
    };

    return (
        <div className='flex w-full h-full'>
            <div className='w-full xl:w-1/2 h-full'>
                {selectItem && (
                    <>
                        <div
                            className='h-full min-w-[100%] xl:min-w-[50%] bg-cover absolute opacity-15'
                            style={{ backgroundImage: `url(${selectItem.snippet.thumbnails.high.url})` }}
                        ></div>

                        <div className='w-full h-full flex flex-col items-center justify-center mt-[150px] gap-8 px-20'>
                            <div
                                className='w-[240px] h-[240px] bg-cover rounded-full border-4 border-white shadow-sm shadow-white'
                                style={{ backgroundImage: `url(${selectItem.snippet.thumbnails.medium.url})` }}
                            ></div>
                            <div className='text-white text-4xl'>{selectItem.snippet.title}</div>
                            <div className='text-gray-400'></div>
                            <div className='hidden' id='player'></div>
                        </div>
                    </>
                )}
            </div>
            <nav className='p-4 w-1/2 h-full flex-col gap-6 hidden xl:flex'>
                <h1 className='mt-8 text-white text-4xl font-normal m-0 p-0'>Play List</h1>
                <div className='text-gray-400 text-2xl'>유튜브로 재생되므로 유튜브 프리미엄이 있어야 광고가 나오지 않습니다.</div>
                {playlistItems.map((item) => (
                    <div className='flex gap-8' key={item.id}>
                        <div
                            className='min-w-[240px] min-h-[100px] bg-cover rounded-md'
                            style={{ backgroundImage: `url(${item.snippet.thumbnails.medium.url})` }}
                        ></div>
                        <li>
                            <div>{item.snippet.title}</div>
                            <button onClick={() => selectVideo(item)}>Play Video</button>
                        </li>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default MusicContainer;
