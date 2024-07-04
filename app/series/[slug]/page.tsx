import PageContainer from '@/components/PageContainer';
import Series from '@/components/series';
import SeriesView from '@/components/series/SeriesView';
import { loadBlogDetails } from '@/utils/parseData';
import ExportedImage from 'next-image-export-optimizer';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const blogs = await loadBlogDetails();

    const series = blogs.filter((blog) => blog.meta.series !== '');
    const seriesSet = new Set(series.map((item) => item.meta.series));
    const seriesTitle = [...seriesSet];
    return seriesTitle.map((title) => ({ slug: encodeURIComponent(title) }));
}

export default async function Page({ params }: { params: { slug: string } }) {
    const blogs = await loadBlogDetails();

    const series = blogs.filter((blog) => blog.meta.series !== '');

    const seriesSet = new Set(series.map((item) => item.meta.series));
    const validSeries = [...seriesSet];

    const decodedSlug = decodeURIComponent(params.slug);
    if (!validSeries.includes(decodedSlug)) {
        notFound(); // 유효하지 않은 slug인 경우 404 반환
    }

    const data = blogs.filter((blog) => decodedSlug === blog.meta.series);
    return (
        <PageContainer>
            <div className='relative mt-10 mx-10 h-[300px]'>
                <ExportedImage
                    alt={data[0].meta.title}
                    src={data[0].meta.src || '/img/template_post.webp'}
                    fill
                    sizes='(max-width: 1000px) 50vw, 450px'
                    className='object-cover m-0 p-0 rounded-xl'
                />
            </div>
            <div className='w-[90%] m-auto select-none'>
                <SeriesView series={data} />
            </div>
        </PageContainer>
    );
}
