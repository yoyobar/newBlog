import { AllPostsProp } from '@/config/types';
import ExportedImage from 'next-image-export-optimizer';
import Link from 'next/link';
import BookEffect from './BookEffect';

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
        <div className="min-h-full max-w-[1100px] p-0 mx-auto">
            <div className="relative z-50 gap-x-14 w-full h-full items-center gap-y-14 flex-wrap flex-col flex md:flex-row mt-20">
                {seriesTitle.map((item) => (
                    <div
                        key={`${item.series}-Series`}
                        className="animate-browse w-[300px] border-l-[20px] border-l-[#4b4b65] dark:border-l-rose-700 rounded-md bg-gray-100 dark:bg-gray-800 transition hover:scale-105 h-[400px] py-10 flex gap-4 justify-center items-center font-bold text-4xl px-10"
                    >
                        <Link
                            href={`/series/${item.series}`}
                            className="no-underline w-full h-full rounded-md items-center flex gap-4 flex-col"
                        >
                            <div className="text-center">{item.series}</div>
                            <div className="relative w-full mt-10 mx-10 h-[200px]">
                                <ExportedImage
                                    alt={item.series}
                                    src={item.src || '/img/template_post.webp'}
                                    fill
                                    sizes="(max-width: 1000px) 50vw, 450px"
                                    className="object-cover m-0 p-0 rounded-xl"
                                />
                            </div>
                            <div className="flex flex-col gap-8 w-full h-fit mt-20 animate-pulse">
                                <div className="bg-gray-400 dark:bg-gray-500 w-full h-2 rounded-lg"></div>
                                <div className="bg-gray-400 dark:bg-gray-500 w-full h-2 rounded-lg"></div>
                                <div className="bg-gray-400 dark:bg-gray-500 w-full h-2 rounded-lg"></div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="hidden md:block">
                <BookEffect />
            </div>
        </div>
    );
};

export default Series;
