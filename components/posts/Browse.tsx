import Link from 'next/link';
import { CiCalendar } from 'react-icons/ci';
import { CiTimer } from 'react-icons/ci';
import Tag from './Tag';

type AllPostsProp = {
    meta: {
        title: string;
        tags: string[];
        date: string;
        readingMinutes: number;
    };
    slug: string;
}[];

const Browse = ({ blogs, selected }: { blogs: AllPostsProp; selected?: string }) => {
    const sortedBlogs = blogs.sort((a, b) => {
        return b.meta.date.localeCompare(a.meta.date);
    });

    const filteredBlogs = selected ? sortedBlogs.filter((item) => item.meta.tags.includes(selected)) : sortedBlogs;

    return (
        <div className='w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-4'>
            {filteredBlogs.map((blog) => (
                <div
                    key={blog.meta.title}
                    className='shadow-slate-950 shadow-sm relative z-10 w-full h-full border border-slate-500 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition'
                >
                    <div className='p-8 flex flex-col gap-8 w-full'>
                        <Link href={`/posts/${blog.slug}`} className='no-underline flex flex-col gap-8'>
                            <div className='text-4xl'>{blog.meta.title}</div>
                            <article className='flex items-center gap-8'>
                                <div className='flex gap-2'>
                                    <CiCalendar className='text-gray-400' />
                                    <div className='dark:text-gray-400 text-gray-600 w-[80px] text-xl'>{blog.meta.date}</div>
                                </div>
                                <div className='flex gap-2'>
                                    <CiTimer className='dark:text-gray-400 text-gray-600' />
                                    <div className='dark:text-gray-400 text-gray-600 w-[40px] text-xl'>{blog.meta.readingMinutes} min</div>
                                </div>
                            </article>
                        </Link>
                        <Tag tags={blog.meta.tags} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Browse;
