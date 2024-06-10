import Link from 'next/link';

interface CategoryProps {
    meta: {
        [key: string]: string;
    };
    slug: string;
}

const Category = ({ blogs }: { blogs: CategoryProps[] }) => {
    const allCategory = blogs.map((meta) => meta.slug.split('/')[0]);
    return allCategory.map((category) => (
        <Link key={category} href={`/posts/${category}`}>
            {category}
        </Link>
    ));
};

export default Category;
