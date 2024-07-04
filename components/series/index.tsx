import { AllPostsProp } from '@/config/types';
import ExportedImage from 'next-image-export-optimizer';
import Link from 'next/link';

interface BrowseProps {
    series: AllPostsProp[];
}

const Series = ({ series }: BrowseProps) => {
    const seriesSet = new Set(
        series.map((item) =>
            JSON.stringify({
                series: item.meta.series,
                src: item.meta.src,
            })
        )
    );
    const seriesTitle = [...seriesSet].map((item) => JSON.parse(item));
    return (
        <>
            <div className='mt-8 text-4xl'>시리즈로 분류된 게시글을 열람합니다.</div>
            <div className='gap-x-20 gap-y-10 flex-warp flex-col flex md:flex-row mt-20'>
                {seriesTitle.map((item) => (
                    <div
                        key={`${item.series}-Series`}
                        className='animate-browse w-[250px] border-l-[20px] border-l-[#4b4b65] dark:border-l-slate-500 rounded-md bg-gray-100 dark:bg-gray-600 transition hover:scale-105 h-[300px] py-10 flex gap-4 justify-center items-center font-bold text-3xl px-10'
                    >
                        <Link
                            href={`/series/${item.series}`}
                            className='no-underline w-full h-full rounded-md items-center flex gap-4 flex-col'
                        >
                            <div className='text-center'>{item.series}</div>
                            <div className='relative w-full mt-10 h-[300px]'>
                                <ExportedImage
                                    alt={item.series}
                                    src={item.src || '/img/template_post.webp'}
                                    fill
                                    sizes='(max-width: 1000px) 50vw, 450px'
                                    className='object-cover m-0 p-0 rounded-xl'
                                />
                            </div>
                            <div className='flex flex-col gap-8 w-full h-full justify-end'>
                                <div className='bg-gray-400 dark:bg-gray-900 w-full h-2 rounded-lg'></div>
                                <div className='bg-gray-400 dark:bg-gray-900 w-full h-2 rounded-lg'></div>
                                <div className='bg-gray-400 dark:bg-gray-900 w-full h-2 rounded-lg'></div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Series;
