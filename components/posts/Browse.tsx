import Link from 'next/link';
import { CiCalendar } from 'react-icons/ci';
import { CiTimer } from 'react-icons/ci';
import BrowseTag from './BrowseTag';

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
        <div className='w-full px-2 grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 relative mb-10'>
            {filteredBlogs.map((blog) => (
                <>
                    <div
                        key={blog.meta.title}
                        className='shadow-slate-950 min-h-[140px] shadow-sm relative z-0 w-full border border-slate-500 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition'
                    >
                        <Link passHref href={`/posts/${blog.slug}`} className='no-underline p-8 flex flex-col gap-8 w-full'>
                            <div className='flex flex-col gap-8'>
                                <div className='text-4xl'>{blog.meta.title}</div>
                                <article className='flex items-center gap-8'>
                                    <div className='flex gap-2'>
                                        <CiCalendar className='text-gray-400' />
                                        <div className='dark:text-gray-400 text-gray-600 w-[80px] text-xl'>{blog.meta.date}</div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <CiTimer className='dark:text-gray-400 text-gray-600' />
                                        <div className='dark:text-gray-400 text-gray-600 w-[40px] text-xl'>
                                            {blog.meta.readingMinutes} min
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </Link>
                        <BrowseTag tags={blog.meta.tags} />
                    </div>
                </>
            ))}
        </div>
    );
};

export default Browse;
