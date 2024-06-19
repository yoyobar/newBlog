import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { FrontMatterTypes } from '@/config/types';
import dayjs from 'dayjs';
import readingTime from 'reading-time';
const BASE_DIR = 'posts';

export async function getPost(category: string, slug: string) {
    const filePath = path.join(BASE_DIR, category, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const frontMatter = data as FrontMatterTypes;

    return {
        frontMatter,
        content,
    };
}

export async function getCategoryPost(category: string) {
    const dirPath = path.join(BASE_DIR, category);
    const fileNames = fs.readdirSync(dirPath);
    const posts = [];

    for (const fileName of fileNames) {
        if (fileName.endsWith('.mdx')) {
            const filePath = path.join(dirPath, fileName);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data } = matter(fileContent);
            const postSlug = path.parse(fileName).name;
            posts.push({ ...data, slug: postSlug });
        }
    }

    return posts;
}

export async function getPosts(category: string) {
    const categoryPath = path.join(BASE_DIR, category);
    const files = fs.readdirSync(categoryPath);
    const blogs = files.map((file) => {
        const filePath = path.join(categoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { content, data } = matter(fileContent);
        const grayMatter = data as FrontMatterTypes;
        return {
            meta: {
                title: grayMatter.title,
                tags: grayMatter.tags,
                src: grayMatter.image,
                date: dayjs(grayMatter.date).format('YYYY-MM-DD'),
                readingMinutes: Math.ceil(readingTime(content).minutes),
            },
            slug: `${category}/${file.replace('.mdx', '')}`,
            length: files.length,
        };
    });
    return blogs;
}
