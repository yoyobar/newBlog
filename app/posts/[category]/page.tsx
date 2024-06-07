import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

const BASE_DIR = 'posts';

export default function CategoryPage({ params }: { params: { category: string } }) {
    const { category } = params;
    const categoryPath = path.join(BASE_DIR, category);
    const files = fs.readdirSync(categoryPath);
    const blogs = files.map((file) => {
        const filePath = path.join(categoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: frontMatter } = matter(fileContent);

        return {
            meta: frontMatter,
            slug: `${category}/${file.replace('.mdx', '')}`,
        };
    });

    return (
        <PageContainer>
            <h1>Category: {category}</h1>
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
