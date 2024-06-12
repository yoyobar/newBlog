import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PageContainer from '@/components/PageContainer';
import { allBrowseLoad, allFilesLoad } from '@/utils/parseData';
import dayjs from 'dayjs';
import readingTime from 'reading-time';
import Title from '@/components/posts/Title';
import Archives from '@/components/posts/Archives';

const BASE_DIR = 'posts';

export type PostMatter = {
    title: string;
    description: string;
    tags: string[];
    date: string;
};

export type AllBrowse = {
    category: string[];
    mdx: string[];
};

export default async function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const { category, mdx }: AllBrowse = allBrowseLoad();
    const categoryFiles = allFilesLoad(category);
    const allFiles = [...mdx.map((file) => ({ category: '', file })), ...categoryFiles];
    const tag = searchParams?.tag === undefined ? '' : String(searchParams.tag);

    const blogs = allFiles.map(({ category, file }) => {
        const filePath = category ? path.join(BASE_DIR, category, file) : path.join(BASE_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { content, data } = matter(fileContent);
        const grayMatter = data as PostMatter;

        return {
            meta: {
                title: grayMatter.title,
                length: allFiles.length,
                tags: grayMatter.tags,
                date: dayjs(grayMatter.date).format('YYYY-MM-DD'),
                readingMinutes: Math.ceil(readingTime(content).minutes),
            },
            slug: category ? `${category}/${file.replace('.mdx', '')}` : file.replace('.mdx', ''),
        };
    });

    return (
        <PageContainer>
            <div className='w-full xl:w-[90%] m-auto select-none'>
                <Title type={'tags'} />
                <Archives tag={tag} blogs={blogs} />
            </div>
        </PageContainer>
    );
}
