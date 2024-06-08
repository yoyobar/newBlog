import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import PageContainer from '@/components/PageContainer';
import Mdx_Body from '@/components/mdx';

const BASE_DIR = 'posts';

async function getPost(category: string, slug: string) {
    const filePath = path.join(BASE_DIR, category, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter, content } = matter(fileContent);

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
            <h1>{frontMatter.title}</h1>
            <Mdx_Body content={content} />
        </PageContainer>
    );
}
