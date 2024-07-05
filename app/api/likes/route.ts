import { supabase } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { postId } = await request.json();
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    try {
        const { data, error } = await supabase
            .from('likes')
            .upsert({ post_id: postId, ip_address: ip }, { onConflict: 'post_id,ip_address' })
            .select();

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to like post' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
        return NextResponse.json({ success: false, error: 'Post ID is required' }, { status: 400 });
    }

    try {
        const { count, error } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', postId);

        if (error) throw error;

        return NextResponse.json({ success: true, count });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to get likes count' }, { status: 500 });
    }
}
