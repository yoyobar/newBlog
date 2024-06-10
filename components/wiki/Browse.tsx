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

const Browse = ({ blogs, type }: { blogs: AllPostsProp; type: string }) => {
    const sortedBlogs = blogs.sort((a, b) => {
        return b.meta.date.localeCompare(a.meta.date);
    });
    const category = blogs.map((blog) => blog.slug.split('/')[0]);

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
            <div className='flex flex-col gap-4'>
                <div>카테고리 연결 테스트</div>
                <Link href='/posts/react'>react</Link>
                <Link href='/posts/css'>css</Link>
                <Link href='/posts/redux'>redux</Link>
            </div>
        </>
    );
};

export default Browse;
