import PageContainer from '@/components/PageContainer';
import { loadBlogDetails } from '@/utils/parseData';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/siteconfig';
import Series from '@/components/series';
import { CDN } from '@/config/const';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Series | Trouble Wiki',
    description: `Trouble Wiki, 개인 블로그. 시리즈물을 다룹니다.`,
    alternates: {
        canonical: `${siteConfig.canonical}series`,
    },
    openGraph: {
        title: `Blogs | Trouble Wiki`,
        images: [CDN + '/img/template_og_series.webp'],
        description: `Trouble Wiki, 개인 블로그. 시리즈물을 다룹니다.`,
    },
    twitter: {
        title: `Blogs | Trouble Wiki`,
        images: [CDN + '/img/template_og_series.webp'],
        description: `Trouble Wiki, 개인 블로그. 시리즈물을 다룹니다.`,
    },
};
async function SeriesContent() {
    const blogs = await loadBlogDetails();

    const series = blogs.filter((blog) => blog.meta.series !== '');

    return <Series series={series} />;
}

export default function Home() {
    return (
        <PageContainer>
            <div className="w-[90%] m-auto select-none">
                <Suspense fallback={<div>Loading...</div>}>
                    <SeriesContent />
                </Suspense>
            </div>
        </PageContainer>
    );
}
