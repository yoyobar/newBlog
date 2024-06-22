import fs from 'fs';
import path from 'path';
import { AllBrowseType, FrontMatterTypes } from '@/config/types';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import readingTime from 'reading-time';

const BASE_DIR = 'posts';

export const allBrowseLoad = () => {
    const allItems = fs.readdirSync(path.join(BASE_DIR));
    const category = allItems.filter((item) => !item.includes('.mdx') && fs.lstatSync(path.join(BASE_DIR, item)).isDirectory());
    const mdx = allItems.filter((item) => item.includes('.mdx'));
    return { category, mdx };
};

export const allFilesLoad = (category: string[]) => {
    const files = category.flatMap((categoryItem) => {
        const fileNames = fs.readdirSync(path.join(BASE_DIR, categoryItem));
        return fileNames.map((file) => ({
            category: categoryItem,
            file,
        }));
    });
    return files;
};

export const loadBlogCategory = async () => {
    const { category, mdx }: AllBrowseType = allBrowseLoad();
    const categoryFiles = allFilesLoad(category);
    const allFiles = [...mdx.map((file) => ({ category: '', file })), ...categoryFiles];

    const categoryCount: { [key: string]: number } = { All: allFiles.length };
    allFiles.forEach(({ category }) => {
        if (category) {
            categoryCount[category] = (categoryCount[category] || 0) + 1;
        }
    });

    return categoryCount;
};

export const loadBlogResource = async () => {
    const { category, mdx }: AllBrowseType = allBrowseLoad();
    const categoryFiles = allFilesLoad(category);
    const allFiles = [...mdx.map((file) => ({ category: '', file })), ...categoryFiles];

    const blogs = allFiles.map(({ category, file }) => {
        const filePath = category ? path.join(BASE_DIR, category, file) : path.join(BASE_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { content, data } = matter(fileContent);
        const grayMatter = data as FrontMatterTypes;

        return {
            meta: {
                title: grayMatter.title,
                tags: grayMatter.tags,
                src: grayMatter.image,
                category: category,
                date: dayjs.utc(grayMatter.date).format('YYYY년 MM월 DD일-HH:mm:ss'),
                readingMinutes: Math.ceil(readingTime(content).minutes),
            },
            slug: category ? `${category}/${file.replace('.mdx', '')}` : file.replace('.mdx', ''),
        };
    });

    return blogs;
};
