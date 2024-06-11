import Link from 'next/link';

interface CategoryProps {
    meta: {
        [key: string]: string;
    };
    slug: string;
}

const Category = ({ blogs }: { blogs: CategoryProps[] }) => {
    const allCategory = blogs.map((meta) => meta.slug.split('/')[0]);
    return (
        <div className='hidden'>
            {allCategory.map((category) => (
                <Link className='no-underline' key={category} href={`/posts/${category}`}>
                    {category}
                </Link>
            ))}
        </div>
    );
};

export default Category;
