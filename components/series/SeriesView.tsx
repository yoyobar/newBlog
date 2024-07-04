import { AllPostsProp } from '@/config/types';
import { FaSwatchbook } from 'react-icons/fa';
import SeriesContent from './SeriesContent';
import ExportedImage from 'next-image-export-optimizer';

interface BrowseProps {
    blogs: AllPostsProp[];
}

const SeriesView = ({ blogs }: BrowseProps) => {
    const readingTime = blogs.reduce((acc, item) => {
        return acc + item.meta.readingMinutes;
    }, 0);
    return (
        <>
            <div className='relative mt-10 mx-10 h-[300px]'>
                <ExportedImage
                    alt={blogs[0].meta.title}
                    src={blogs[0].meta.src || '/img/template_post.webp'}
                    fill
                    sizes='(max-width: 1000px) 50vw, 450px'
                    className='object-cover m-0 p-0 rounded-xl'
                />
            </div>
            <div className='animate-browse'>
                <div className='w-full gap-2 items-center flex justify-between bg-slate-600 text-white p-5 mt-10 mb-2 rounded-md'>
                    <div className='text-4xl px-10 '>{blogs[0].meta.series}</div>
                    <div className='flex gap-2'>
                        <FaSwatchbook className='animate-bounce' />
                        <div>{readingTime} min</div>
                    </div>
                </div>
                <SeriesContent view={blogs} />
            </div>
        </>
    );
};

export default SeriesView;
