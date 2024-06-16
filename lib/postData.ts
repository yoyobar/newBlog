import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { FrontMatterTypes } from '@/config/types';
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
