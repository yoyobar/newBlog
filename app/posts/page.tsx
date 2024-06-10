import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PageContainer from '@/components/PageContainer';
import { allBrowseLoad, allFilesLoad } from '@/lib/parseData';
import Category from '@/components/wiki/Category';
import Browse from '@/components/wiki/Browse';
import dayjs from 'dayjs';
import readingTime from 'reading-time';
import { headers } from 'next/headers';
import Title from '@/components/wiki/Title';
import Link from 'next/link';

const BASE_DIR = 'posts';

type PostMatter = {
    title: string;
    description: string;
    tags: string[];
    date: string;
};

type AllBrowse = {
    category: string[];
    mdx: string[];
};

export default function Home() {
    const { category, mdx }: AllBrowse = allBrowseLoad();
    const categoryFiles = allFilesLoad(category);

    const allFiles = [...mdx.map((file) => ({ category: '', file })), ...categoryFiles];

    const blogs = allFiles.map(({ category, file }) => {
        const filePath = category ? path.join(BASE_DIR, category, file) : path.join(BASE_DIR, file);
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
            slug: category ? `${category}/${file.replace('.mdx', '')}` : file.replace('.mdx', ''),
        };
    });

    return (
        <PageContainer>
            <Title type={'all'} />
            <Browse blogs={blogs} />
            <div className='flex flex-col gap-4'>
                <div>카테고리 연결 테스트</div>
                <Link href='/posts/react'>react</Link>
                <Link href='/posts/css'>css</Link>
                <Link href='/posts/redux'>redux</Link>
            </div>
        </PageContainer>
    );
}
