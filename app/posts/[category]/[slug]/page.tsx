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
