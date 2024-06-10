import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import dayjs from 'dayjs';
import readingTime from 'reading-time';
import Title from '@/components/wiki/Title';

const BASE_DIR = 'posts';

type PostMatter = {
    title: string;
    description: string;
    tags: string[];
    date: string;
};

export default function CategoryPage({ params }: { params: { category: string } }) {
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
            <Title type={category} />
            {blogs.map((blog) => (
                <Link key={blog.slug} href={`/posts/${blog.slug}`}>
                    <article>
                        <h2>{blog.meta.title}</h2>
                        <p>{blog.meta.date}</p>
                    </article>
                </Link>
            ))}
        </PageContainer>
    );
}
