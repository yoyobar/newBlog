import Link from 'next/link';

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
            <div className='w-full h-full flex flex-col gap-4'>
                {sortedBlogs.map((blog) => (
                    <Link passHref href={`/posts/${blog.slug}`} key={blog.meta.title} className='w-full h-full bg-slate-600 rounded-md'>
                        <div></div>
                        <h2>{blog.meta.title}</h2>
                        <h3>{blog.meta.date}</h3>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Browse;
