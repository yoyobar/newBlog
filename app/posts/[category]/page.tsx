import fs from 'fs';
import PageContainer from '@/components/PageContainer';
import Browse from '@/components/posts/Browse';
import { getPosts } from '@/utils/parseData';
import { metadata } from '@/utils/mdx/metaData';
import { loadBlogCategoryCount } from '@/utils/parseData';
import { siteConfig } from '@/config/siteconfig';

const BASE_DIR = 'posts';
export async function generateMetadata({
    params,
}: {
    params: { category: string; slug: string };
}) {
    const { category } = params;
    const metaObj = metadata[category] || metadata['all'];
    const titleName = metaObj.title;

    return {
        title: `${titleName} | Trouble Wiki`,
        keywords: [category, titleName, 'wiki', 'Trouble Wiki'],
        openGraph: {
            title: `${titleName} | Trouble Wiki`,
            images: ['/img/template_og_browse.webp'],
            description: `Trouble Wiki, 개인 블로그. ${titleName} 카테고리의 게시물`,
        },
        twitter: {
            title: `${titleName} | Trouble Wiki`,
            images: ['/img/template_og_browse.webp'],
            description: `Trouble Wiki, 개인 블로그. ${titleName} 카테고리의 게시물`,
        },
        alternates: {
            canonical: `${siteConfig.canonical}/posts/${category}`,
        },
    };
}

export async function generateStaticParams() {
    const categories = fs.readdirSync(BASE_DIR);
    return categories.map((category) => ({
        category,
    }));
}
export default async function Page({ params }: { params: { category: string } }) {
    const { category } = params;
    const blogCategory = await loadBlogCategoryCount();
    const blogs = await getPosts(category);

    return (
        <PageContainer>
            <div className='w-[90%] select-none m-auto'>
                <Browse blogs={blogs} categories={blogCategory} />
            </div>
        </PageContainer>
    );
}
