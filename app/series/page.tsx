import PageContainer from '@/components/PageContainer';
import { loadBlogDetails } from '@/utils/parseData';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/siteconfig';
import Series from '@/components/series';

export const metadata: Metadata = {
    title: 'Series | Trouble Wiki',
    description: `Trouble Wiki, 개인 블로그. 시리즈물을 다룹니다.`,
    alternates: {
        canonical: `${siteConfig.canonical}series`,
    },
    openGraph: {
        title: `Blogs | Trouble Wiki`,
        images: ['/img/template_og_series.webp'],
        description: `Trouble Wiki, 개인 블로그. 시리즈물을 다룹니다.`,
    },
    twitter: {
        title: `Blogs | Trouble Wiki`,
        images: ['/img/template_og_series.webp'],
        description: `Trouble Wiki, 개인 블로그. 시리즈물을 다룹니다.`,
    },
};
export default async function Home() {
    const blogs = await loadBlogDetails();

    const series = blogs.filter((blog) => blog.meta.series !== '');
    return (
        <PageContainer>
            <div className='w-[90%] m-auto select-none'>
                <Series series={series} />
            </div>
        </PageContainer>
    );
}
