import Link from 'next/link';
import { CiCalendar } from 'react-icons/ci';
import { IoTimerOutline } from 'react-icons/io5';
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
                        <div key={blog.meta.title} className='animate-browse relative active:scale-100 transition'>
                            <Link
                                className='no-underline relative z-0 w-full rounded-xl gap-3 overflow-hidden'
                                passHref
                                href={`/posts/${blog.slug}`}
                            >
                                <nav className='flex h-full flex-col gap-3 overflow-hidden rounded-md border shadow-md transition-all hover:shadow-xl dark:border-slate-700 dark:hover:border-white'>
                                    <div className='relative aspect-video w-full rounded-t-md border-b dark:border-slate-700'>
                                        <ExportedImage
                                            sizes='(max-width: 1000px) 50vw, 450px'
                                            className='p-0 m-0 inset-0 object-cover text-transparent'
                                            fill
                                            alt={blog.meta.title}
                                            src={blog.meta.src !== '' ? blog.meta.src : '/img/template_post.webp'}
                                        />
                                    </div>

                                    <div className='flex flex-1 flex-col justify-between p-4 pt-1'>
                                        <div>
                                            <div className='text-xl font-medium text-pink-600 md:text-2xl'>{blog.meta.category}</div>
                                            <div className='mb-3 mt-1 font-bold text-2xl md:text-3xl'>{blog.meta.title}</div>
                                            <div className='flex text-2xl justify-between items-center text-gray-600 dark:text-gray-300'>
                                                <div className='flex gap-2 items-center'>
                                                    <CiCalendar className='text-3xl' /> <div>{blog.meta.date}</div>
                                                </div>
                                                <div className='flex gap-2 items-center'>
                                                    <IoTimerOutline className='animate-spin text-3xl antialiased' />
                                                    <div className='opacity-0 hover:opacity-100 transition absolute w-[60px] h-[20px] bg-slate-100 shadow-md rounded-md right-2 p-1 text-center text-xl flex items-center justify-center'>
                                                        <div>읽는 시간</div>
                                                    </div>
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
