import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PageContainer from '@/components/PageContainer';
import { allBrowseLoad, allFilesLoad } from '@/utils/parseData';
import { FrontMatterTypes } from '@/config/types';
import Browse from '@/components/posts/Browse';
import dayjs from 'dayjs';
import readingTime from 'reading-time';
import Title from '@/components/posts/Title';
import { AllBrowseType } from '@/config/types';
import type { Metadata } from 'next';

const BASE_DIR = 'posts';

export const metadata: Metadata = {
    title: '전체 | Trouble Wiki',
    description: `Trouble Wiki, 개인 블로그. 전체 게시물`,
};

export default function Home() {
    const { category, mdx }: AllBrowseType = allBrowseLoad();
    const categoryFiles = allFilesLoad(category);
    const allFiles = [...mdx.map((file) => ({ category: '', file })), ...categoryFiles];

    //TODO : 비동기 처리 해보기
    const blogs = allFiles.map(({ category, file }) => {
        const filePath = category ? path.join(BASE_DIR, category, file) : path.join(BASE_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { content, data } = matter(fileContent);
        const grayMatter = data as FrontMatterTypes;

        return {
            meta: {
                title: grayMatter.title,
                length: allFiles.length,
                tags: grayMatter.tags,
                src: grayMatter.image,
                date: dayjs(grayMatter.date).format('YYYY-MM-DD'),
                readingMinutes: Math.ceil(readingTime(content).minutes),
            },
            slug: category ? `${category}/${file.replace('.mdx', '')}` : file.replace('.mdx', ''),
        };
    });

    return (
        <PageContainer>
            <div className='w-[90%] m-auto select-none'>
                <Title type={'all'} length={allFiles.length} />
                <Browse blogs={blogs} />
            </div>
        </PageContainer>
    );
}
