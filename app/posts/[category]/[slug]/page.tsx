import fs from 'fs';
import path from 'path';
import PageContainer from '@/components/PageContainer';
import Mdx_Body from '@/components/mdx';
import Mdx_Header from '@/components/mdx/header';
import Mdx_Toc from '@/components/mdx/toc';
import Mdx_Footer from '@/components/mdx/footer';
import { getCategoryPost, getPost } from '@/lib/postData';
import { FootMatterTypes } from '@/config/types';
const BASE_DIR = 'posts';

export async function generateMetadata({ params }: { params: { category: string; slug: string } }) {
    const { category, slug } = params;
    const { frontMatter } = await getPost(category, slug);
    return {
        url: 'https://trouble-wiki.vercel.app/',
        metadataBase: new URL('https://trouble-wiki.vercel.app/'),

        icons: {
            icon: '/logo/main-logo.png',
            shortcut: '/logo/main-logo.png',
            apple: '/logo/main-logo.png',
            other: {
                rel: 'main-logo',
                url: '/logo/main-logo.png',
            },
        },

        title: `${frontMatter.title} | Trouble Wiki`,
        description: 'Trouble Wiki, 개인 블로그. 다양한 개발정보를 다룹니다.',
        keywords: frontMatter.tags,
        creator: 'Minsu Kim',

        openGraph: {
            images: [frontMatter.image ? frontMatter.image : '/logo/template_og.webp'],
            description: frontMatter.description,
            type: 'article',
            publishedTime: frontMatter.date,
            authors: ['Minsu Kim', 'yoyobar'],
        },

        twitter: {
            card: 'summary_large_image',
            title: `${frontMatter.title} | Trouble Wiki`,
            description: 'Trouble Wiki, 개인 블로그. 다양한 개발정보를 다룹니다.',
            creator: 'yoyobar',
            images: [frontMatter.image ? frontMatter.image : '/logo/template_og.webp'],
        },
    };
}

export async function generateStaticParams() {
    const allItems = fs.readdirSync(BASE_DIR);
    const categories = allItems.filter((item) => !item.includes('.mdx') && fs.lstatSync(path.join(BASE_DIR, item)).isDirectory());

    const allPaths = categories.flatMap((category) => {
        const files = fs.readdirSync(path.join(BASE_DIR, category));
        return files.map((file) => ({
            category,
            slug: file.replace('.mdx', ''),
        }));
    });

    return allPaths;
}
export default async function Page({ params }: { params: { category: string; slug: string } }) {
    const { category, slug } = params;
    const { frontMatter, content } = await getPost(category, slug);
    const footMatter = (await getCategoryPost(category)) as FootMatterTypes[];

    const tocControl = frontMatter?.toc === undefined && true;

    return (
        <PageContainer>
            {tocControl && <Mdx_Toc />}
            <div className='m-auto w-[95%] xl:w-[70%] 3xl:w-[50%]'>
                <Mdx_Header frontMatter={{ ...frontMatter, category: category }} />
                <Mdx_Body content={content} />
                <Mdx_Footer footMatter={footMatter} />
            </div>
        </PageContainer>
    );
}
