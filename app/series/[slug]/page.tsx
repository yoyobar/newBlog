import PageContainer from '@/components/PageContainer';
import SeriesView from '@/components/series/SeriesView';
import { getSeries } from '@/utils/parseData';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const decodeSlug = decodeURIComponent(slug);
    const blogs = await getSeries(decodeSlug);

    return (
        <PageContainer>
            <Suspense fallback={<div>Loading...</div>}>
                <div className='w-[90%] m-auto select-none'>
                    <SeriesView blogs={blogs} />
                </div>
            </Suspense>
        </PageContainer>
    );
}
