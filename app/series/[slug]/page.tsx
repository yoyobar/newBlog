import PageContainer from '@/components/PageContainer';
import SeriesView from '@/components/series/SeriesView';
import { siteConfig } from '@/config/siteconfig';
import { getSeries, loadBlogDetails } from '@/utils/parseData';
import { Suspense } from 'react';

export async function generateMetadata({
    params,
}: {
    params: { category: string; slug: string };
}) {
    const { slug } = params;
    const decodeSlug = decodeURIComponent(slug);
    const blogs = await getSeries(decodeSlug);
    return {
        title: `${blogs[0].meta.series} | Trouble Wiki`,
        keywords: blogs[0].meta.tags,
        description: blogs[0].meta.description,
        openGraph: {
            images: [blogs[0].meta.src ? blogs[0].meta.src : '/img/template_post.webp'],
            description: blogs[0].meta.description,
            publishedTime: blogs[0].meta.date,
        },
        twitter: {
            images: [blogs[0].meta.src ? blogs[0].meta.src : '/img/template_post.webp'],
            description: blogs[0].meta.description,
            title: `${blogs[0].meta.title} | Trouble Wiki`,
        },
        alternates: {
            canonical: `${siteConfig.canonical}series/${blogs[0].meta.series}`,
        },
    };
}

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
