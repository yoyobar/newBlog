import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PageContainer from '@/components/PageContainer';
import Mdx_Body from '@/components/mdx';
import { FrontMatterTypes } from '@/config/types';
import Mdx_Header from '@/components/mdx/header/Mdx_Header';
import Mdx_Toc from '@/components/mdx/toc';
const BASE_DIR = 'posts';

async function getPost(category: string, slug: string) {
    const filePath = path.join(BASE_DIR, category, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontMatter = data as FrontMatterTypes;

    return {
        frontMatter,
        content,
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
    return (
        <PageContainer>
            <Mdx_Toc />
            <div className='m-auto w-[95%] xl:w-[70%] 3xl:w-[50%]'>
                <Mdx_Header frontMatter={{ ...frontMatter, category: category }} />
                <Mdx_Body content={content} />
            </div>
        </PageContainer>
    );
}
