import PageContainer from '@/components/PageContainer';
import SeriesView from '@/components/series/SeriesView';
import { getSeries, loadBlogDetails } from '@/utils/parseData';
import { Suspense } from 'react';

export async function generateStaticParams() {
    const blogs = await loadBlogDetails();
    const series = blogs.filter((blog) => blog.meta.series !== '');
    const seriesSet = new Set(series.map((item) => item.meta.series));
    const seriesTitle = [...seriesSet];

    return seriesTitle.map((title) => ({
        params: { slug: encodeURIComponent(title) },
    }));
}

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
