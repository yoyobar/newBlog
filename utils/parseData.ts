import fs from 'fs';
import path from 'path';
import { AllBrowseType, FrontMatterTypes } from '@/config/types';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import readingTime from 'reading-time';
dayjs.extend(utc);

const BASE_DIR = 'posts';

//? 전체 Directory 로드
export const allDirectoryLoad = () => {
    const allItems = fs.readdirSync(path.join(BASE_DIR));
    const category = allItems.filter(
        (item) =>
            !item.includes('.mdx') &&
            fs.lstatSync(path.join(BASE_DIR, item)).isDirectory()
    );
    const mdx = allItems.filter((item) => item.includes('.mdx'));
    return { category, mdx };
};

//? 전체 File 로드
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

//? 전체 카테고리와 전체 파일을 인식 후 matter정보, 경로 불러옴
//! /posts/[category]
export const loadBlogDetails = async () => {
    const { category, mdx }: AllBrowseType = allDirectoryLoad();
    const categoryFiles = allFilesLoad(category);
    const allFiles = [...mdx.map((file) => ({ category: '', file })), ...categoryFiles];

    const blogs = allFiles.map(({ category, file }) => {
        const filePath = category
            ? path.join(BASE_DIR, category, file)
            : path.join(BASE_DIR, file);
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
                hidden: grayMatter?.hidden || false,
            },
            slug: category
                ? `${category}/${file.replace('.mdx', '')}`
                : file.replace('.mdx', ''),
        };
    });
    return blogs;
};

//? 전체 카테고리와 전체 파일의 총 게시물 갯수를 불러옴
//! matter 내 hidden 속성 제외
//! /posts, /posts/[category],
export const loadBlogCategoryCount = async () => {
    const blogs = await loadBlogDetails();
    const categoryCount: { [key: string]: number } = { All: 0 };

    blogs.forEach(({ meta: { category, hidden } }) => {
        if (!hidden) {
            categoryCount.All++;
            if (category) {
                categoryCount[category] = (categoryCount[category] || 0) + 1;
            }
        }
    });
    return categoryCount;
};

//? 전체 카테고리와 전체 파일중 카테고리에 맞는 항목만 추출
//! matter 내 hidden 속성 제외
//! /posts/[category]
export async function getPosts(category: string) {
    const allBlogs = await loadBlogDetails();
    return allBlogs.filter(
        (blog) => blog.meta.category === category && !blog.meta.hidden
    );
}

//? 이전, 현재, 다음의 해당하는 게시물을 불러옴
//! matter 내 hidden 속성 제외
//! /posts/[category]/[slug]
export async function getCategoryPost(category: string) {
    const dirPath = path.join(BASE_DIR, category);
    const fileNames = fs.readdirSync(dirPath);
    const posts = [];

    for (const fileName of fileNames) {
        if (fileName.endsWith('.mdx')) {
            const filePath = path.join(dirPath, fileName);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data } = matter(fileContent);
            const grayMatter = data as FrontMatterTypes;
            if (!grayMatter.hidden) {
                const postSlug = path.parse(fileName).name;
                posts.push({ ...data, slug: postSlug });
            }
        }
    }

    return posts;
}

//? 게시물 내부 컨텐츠와 상세정보를 불러옴
//! /posts/[category]/[slug]
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
