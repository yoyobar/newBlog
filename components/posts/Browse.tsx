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

const Browse = ({ blogs }: { blogs: AllPostsProp }) => {
    const sortedBlogs = blogs.sort((a, b) => {
        return b.meta.date.localeCompare(a.meta.date);
    });

    return (
        <>
            <div className='w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-4'>
                {sortedBlogs.map((blog) => (
                    <div
                        key={blog.meta.title}
                        className='shadow-slate-950 shadow-sm relative z-10 w-full h-full border border-slate-500 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition'
                    >
                        <Link href={`/posts/${blog.slug}`} className='no-underline p-8 flex flex-col gap-8'>
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
                    </div>
                ))}
            </div>
        </>
    );
};

export default Browse;
