import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PageContainer from '@/components/PageContainer';
import dayjs from 'dayjs';
import readingTime from 'reading-time';
import Title from '@/components/posts/Title';
import Browse from '@/components/posts/Browse';

const BASE_DIR = 'posts';

type PostMatter = {
    title: string;
    description: string;
    tags: string[];
    date: string;
};

export async function generateStaticParams() {
    const categories = fs.readdirSync(BASE_DIR);
    return categories.map((category) => ({
        category,
    }));
}

export default async function Page({ params }: { params: { category: string } }) {
    const { category } = params;

    const categoryPath = path.join(BASE_DIR, category);
    const files = fs.readdirSync(categoryPath);
    const blogs = files.map((file) => {
        const filePath = path.join(categoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { content, data } = matter(fileContent);
        const grayMatter = data as PostMatter;
        return {
            meta: {
                title: grayMatter.title,
                tags: grayMatter.tags,
                date: dayjs(grayMatter.date).format('YYYY-MM-DD'),
                readingMinutes: Math.ceil(readingTime(content).minutes),
            },
            slug: `${category}/${file.replace('.mdx', '')}`,
        };
    });

    return (
        <PageContainer>
            <div className='w-full xl:w-[90%] m-auto'>
                <Title type={category} length={files.length} />
                <Browse blogs={blogs} />
            </div>
        </PageContainer>
    );
}
