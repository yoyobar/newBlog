import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PageContainer from '@/components/PageContainer';
import dayjs from 'dayjs';
import readingTime from 'reading-time';
import Title from '@/components/posts/Title';
import Archives from '@/components/posts/Archives';
import { allBrowseLoad, allFilesLoad } from '@/utils/parseData';
import { AllBrowseType, FrontMatterTypes } from '@/config/types';
import { Suspense } from 'react';
import type { Metadata } from 'next';

const BASE_DIR = 'posts';

export const metadata: Metadata = {
    title: 'Archives | Trouble Wiki',
    description: `Trouble Wiki, 개인 블로그. 태그별로 조회합니다.`,
    openGraph: {
        title: `Archives | Trouble Wiki`,
        images: ['/logo/template_og_archives.webp'],
        description: 'Trouble Wiki, 개인 블로그. 태그별로 조회합니다.',
    },
    twitter: {
        title: `Archives | Trouble Wiki`,
        images: ['/logo/template_og_archives.webp'],
        description: 'Trouble Wiki, 개인 블로그. 태그별로 조회합니다.',
    },
};

export default function ArchivesPage() {
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
                length: allFiles.length,
                tags: grayMatter.tags,
                src: grayMatter.image,
                date: dayjs(grayMatter.date).format('YYYY-MM-DD'),
                readingMinutes: Math.ceil(readingTime(content).minutes),
            },
            slug: category ? `${category}/${file.replace('.mdx', '')}` : file.replace('.mdx', ''),
        };
    });

    const tags = blogs.flatMap((blog) => blog.meta.tags);
    const filteredTags = Array.from(new Set(tags));
    const sortedTags = filteredTags.sort((a, b) => a.localeCompare(b));

    return (
        <PageContainer>
            <div className='w-full md:w-[90%] m-auto select-none'>
                <Title type={'archives'} />
                <Suspense fallback={<div>Loading...</div>}>
                    <Archives blogs={blogs} tag={sortedTags} />
                </Suspense>
            </div>
        </PageContainer>
    );
}
