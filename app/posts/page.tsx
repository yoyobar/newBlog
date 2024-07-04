import PageContainer from '@/components/PageContainer';
import { loadBlogCategoryCount, loadBlogDetails } from '@/utils/parseData';
import Browse from '@/components/posts/Browse';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/siteconfig';

export const metadata: Metadata = {
    title: 'Blogs | Trouble Wiki',
    description: `Trouble Wiki, 개인 블로그. 전체 게시물을 다룹니다.`,
    alternates: {
        canonical: `${siteConfig.canonical}/posts`,
    },
    openGraph: {
        title: `Blogs | Trouble Wiki`,
        images: ['/img/template_og_browse.webp'],
        description: `Trouble Wiki, 개인 블로그. 전체 게시물을 다룹니다.`,
    },
    twitter: {
        title: `Blogs | Trouble Wiki`,
        images: ['/img/template_og_browse.webp'],
        description: `Trouble Wiki, 개인 블로그. 전체 게시물을 다룹니다.`,
    },
};

export default async function Home() {
    const blogs = await loadBlogDetails();
    const category = await loadBlogCategoryCount();

    return (
        <PageContainer>
            <div className='w-[90%] m-auto select-none'>
                <Browse blogs={blogs} categories={category} />
            </div>
        </PageContainer>
    );
}
