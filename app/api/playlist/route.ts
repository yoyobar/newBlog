import { NextRequest, NextResponse } from 'next/server';

type PlaylistItem = {
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
        };
    };
    id: string;
};

type PlaylistResponse = {
    items: PlaylistItem[];
};

export async function GET(req: NextRequest) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const playlistId = process.env.YOUTUBE_PLAYLIST_ID;
    const maxResults = 25;
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems`; // API URL
    const part = 'snippet,id'; // 조회하고자 하는 항목들을 입력합니다.

    const url = `${apiUrl}?part=${part}&playlistId=${playlistId}&maxResults=${maxResults}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data: PlaylistResponse = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
