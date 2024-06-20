import Link from 'next/link';
import { CiCalendar } from 'react-icons/ci';
import { CiTimer } from 'react-icons/ci';
import ExportedImage from 'next-image-export-optimizer';
import { AllPostsProp } from '@/config/types';
import BrowseCategory from './BrowseCategory';

interface BrowseProps {
    blogs: AllPostsProp[];
    categories: { [key: string]: number };
}

const Browse = ({ blogs, categories }: BrowseProps) => {
    const sortedBlogs = blogs.sort((a, b) => {
        return b.meta.date.localeCompare(a.meta.date);
    });

    return (
        <div className='relative h-full p-0 mt-4'>
            <section className='hidden bg-white dark:bg-darkInner-background lg:flex p-4 sticky top-0 mx-auto w-full max-w-[1300px] px-4 rounded-md gap-8 z-10'>
                <BrowseCategory categories={categories} />
            </section>
            <section className='mx-auto mt-12 w-full max-w-[950px] px-4'>
                <div className='w-full px-2 grid grid-cols-1 lg:grid-cols-2 gap-8 2xl:gap-12 relative mt-20 mb-20'>
                    {sortedBlogs.map((blog) => (
                        <div key={blog.meta.title} className='animate-browse relative active:scale-100 hover:scale-[97%] transition'>
                            <Link
                                className='no-underline relative z-0 w-full rounded-xl gap-3 overflow-hidden'
                                passHref
                                href={`/posts/${blog.slug}`}
                            >
                                <nav className='flex h-full flex-col gap-3 overflow-hidden rounded-md border shadow-md transition hover:shadow-xl dark:border-slate-700 dark:hover:border-white'>
                                    <div className='relative aspect-video w-full rounded-t-md border-b dark:border-slate-700'>
                                        <ExportedImage
                                            sizes='(max-width: 1000px) 50vw, 450px'
                                            className='p-0 m-0 inset-0 object-cover text-transparent'
                                            fill
                                            alt={blog.meta.title}
                                            src={blog.meta.src !== '' ? blog.meta.src : '/logo/template.webp'}
                                        />
                                    </div>

                                    <div className='flex flex-1 flex-col justify-between p-4 pt-1'>
                                        <div>
                                            <div className='text-xl font-medium text-pink-600 md:text-2xl'>{blog.meta.category}</div>
                                            <div className='mb-3 mt-1 font-bold text-2xl md:text-3xl'>{blog.meta.title}</div>
                                            <div className='flex text-2xl justify-between items-center text-gray-600'>
                                                <div className='flex gap-2 items-center'>
                                                    <CiCalendar />
                                                    <div>{blog.meta.date}</div>
                                                </div>
                                                <div className='flex gap-2 items-center'>
                                                    <CiTimer />
                                                    <div>{blog.meta.readingMinutes}분</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Browse;
