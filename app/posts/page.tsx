import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import PageContainer from '@/components/PageContainer';
import { allBrowseLoad, allFilesLoad } from '@/lib/parseData';

const BASE_DIR = 'posts';

export default function Home() {
    const { category, mdx } = allBrowseLoad();
    const categoryFiles = allFilesLoad(category);

    const allFiles = [...mdx.map((file) => ({ category: '', file })), ...categoryFiles];

    const blogs = allFiles.map(({ category, file }) => {
        const filePath = category ? path.join(BASE_DIR, category, file) : path.join(BASE_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: frontMatter } = matter(fileContent);

        return {
            meta: frontMatter,
            slug: category ? `${category}/${file.replace('.mdx', '')}` : file.replace('.mdx', ''),
        };
    });

    return (
        <PageContainer>
            {blogs.map((blog) => (
                <Link passHref key={blog.slug} href={`/posts/${blog.slug}`}>
                    <article>
                        <h2>{blog.meta.title}</h2>
                        {blog.meta.category && <p>Category: {blog.meta.category}</p>}
                    </article>
                </Link>
            ))}
        </PageContainer>
    );
}
