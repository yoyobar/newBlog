import PageContainer from '@/components/PageContainer';
import React from 'react';

export default function Loading() {
    return (
        <PageContainer>
            <div className="flex justify-center items-center h-full w-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        </PageContainer>
    );
}
