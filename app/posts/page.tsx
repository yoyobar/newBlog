import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

export default function Home() {
    const blogDir = 'posts/';
    const files = fs.readdirSync(path.join(blogDir));
    const blogs = files.map((filename) => {
        const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8');

        const { data: frontMatter } = matter(fileContent);

        return {
            meta: frontMatter,
            slug: filename.replace('.mdx', ''),
        };
    });

    return (
        <PageContainer>
            {blogs.map((blog) => (
                <Link passHref key={blog.slug} href={'/posts/' + blog.slug}>
                    <article>{blog.meta.title}</article>
                </Link>
            ))}
        </PageContainer>
    );
}
