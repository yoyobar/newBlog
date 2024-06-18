import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const query = req.url?.split('videoId=')[1];
    if (!query) {
        throw new Error('query data missing');
    }
    const apiKey = process.env.YOUTUBE_API_KEY as string;
    const videoId = query; // 조회하고자 하는 비디오의 ID를 입력합니다.
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos`; // API URL
    const part = 'contentDetails'; // 조회하고자 하는 항목들을 입력합니다.
    const url = `${apiUrl}?part=${part}&id=${videoId}&key=${apiKey}`; // 완성된 요청 URL

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
