import { PlaylistResponse } from '@/config/types';

export async function fetchPlaylistItems() {
    try {
        const response = await fetch('../api/playlist');
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data: PlaylistResponse = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

const parseISODuration = (duration: string) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
};

export async function fetchDetailItems(id: string) {
    try {
        const response = await fetch(`../api/playdetail?videoId=${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data: PlaylistResponse = await response.json();
        const duration = parseISODuration(data.items[0].contentDetails.duration);
        return duration;
    } catch (error) {
        console.error(error);
    }
}

export const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const displaySeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${displayMinutes}:${displaySeconds}`;
};
