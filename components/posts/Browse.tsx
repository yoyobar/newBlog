import Link from 'next/link';
import { CiCalendar } from 'react-icons/ci';
import { CiTimer } from 'react-icons/ci';
import BrowseTag from './BrowseTag';
import ExportedImage from 'next-image-export-optimizer';
import { AllPostsProp } from '@/config/types';

const Browse = ({ blogs, selected }: { blogs: AllPostsProp[]; selected?: string }) => {
    const sortedBlogs = blogs.sort((a, b) => {
        return b.meta.date.localeCompare(a.meta.date);
    });

    const filteredBlogs = selected ? sortedBlogs.filter((item) => item.meta.tags.includes(selected)) : sortedBlogs;

    return (
        <div className='w-full px-2 grid grid-cols-1 2xl:grid-cols-2 gap-8 relative mb-10'>
            {filteredBlogs.map((blog) => (
                <>
                    <div
                        key={blog.meta.title}
                        className='transition hover:scale-105 active:scale-100 min-h-[120px] md:min-h-[140px] relative z-0 w-full border-black dark:border-darkInner-border border-2 rounded-xl'
                    >
                        <Link passHref href={`/posts/${blog.slug}`} className='no-underline p-8 flex flex-col gap-8 w-full'>
                            <div className='flex flex-col gap-4'>
                                <div className='text-4xl'>{blog.meta.title}</div>
                                <article className='flex items-center gap-4'>
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
                                    <div className='right-0 opacity-50 md:opacity-100 flex w-1/3 h-full top-0 justify-end items-center absolute md:w-[200px]'>
                                        <ExportedImage
                                            alt={blog.meta.title}
                                            fill
                                            sizes='100vw'
                                            className='p-0 m-0 rounded-r-md'
                                            src={blog.meta.src !== '' ? blog.meta.src : '/logo/template.webp'}
                                        />
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
