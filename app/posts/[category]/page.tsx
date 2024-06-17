import fs from 'fs';
import PageContainer from '@/components/PageContainer';
import Title from '@/components/posts/Title';
import Browse from '@/components/posts/Browse';
import { getPosts } from '@/lib/postData';
import { metadata } from '@/utils/metaData';

const BASE_DIR = 'posts';
export async function generateMetadata({ params }: { params: { category: string; slug: string } }) {
    const { category } = params;
    const metaObj = metadata[category] || metadata['all'];
    const titleName = metaObj.title;

    return {
        title: `${titleName} | Trouble Wiki`,
        keywords: [category, titleName],
        openGraph: {
            title: `${titleName} | Trouble Wiki`,
            images: ['/logo/template_og_browse.webp'],
            description: '게시글 목록 | Trouble Wiki',
        },
        twitter: {
            title: `${titleName} | Trouble Wiki`,
            images: ['/logo/template_og_browse.webp'],
            description: `Trouble Wiki, 개인 블로그. ${titleName} 카테고리의 게시물`,
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
    const blogs = await getPosts(category);

    return (
        <PageContainer>
            <div className='w-full xl:w-[90%] m-auto'>
                <Title type={category} length={blogs.length} />
                <Browse blogs={blogs} />
            </div>
        </PageContainer>
    );
}
