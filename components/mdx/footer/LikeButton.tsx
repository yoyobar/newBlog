'use client';

import { useState, useEffect } from 'react';

interface LikeButtonProps {
    postId: string | null;
}

export default function LikeButton({ postId }: LikeButtonProps) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (postId) {
            fetchLikes();
        } else {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

    const fetchLikes = async () => {
        if (!postId) return;

        try {
            const res = await fetch(`/api/likes?postId=${postId}`);
            const data = await res.json();
            if (data.success) {
                setLikes(data.count);
                setIsLiked(data.isLiked);
            }
        } catch (error) {
            console.error('Error fetching likes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLike = async () => {
        if (!postId) return;

        try {
            const res = await fetch('/api/likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId }),
            });

            const data = await res.json();
            if (data.success) {
                setLikes((prev) => prev + 1);
                setIsLiked(true);
            }
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (!postId) return null;

    return (
        <button
            onClick={handleLike}
            disabled={isLiked}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
            {isLiked ? '좋아요 완료' : '좋아요'} ({likes})
        </button>
    );
}
