import PageContainer from '@/components/PageContainer';
import { loadBlogCategory, loadBlogResource } from '@/utils/parseData';
import Browse from '@/components/posts/Browse';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/siteconfig';

export const metadata: Metadata = {
    title: '전체 | Trouble Wiki',
    description: `Trouble Wiki, 개인 블로그. 전체 게시물`,
    alternates: {
        canonical: `${siteConfig.canonical}/posts`,
    },
};
export default function Home() {
    const blogs = loadBlogResource();
    const category = loadBlogCategory();

    return (
        <PageContainer>
            <div className='w-[90%] m-auto select-none'>
                <Browse blogs={blogs} categories={category} />
            </div>
        </PageContainer>
    );
}
