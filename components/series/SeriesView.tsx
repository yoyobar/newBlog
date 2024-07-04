import { AllPostsProp } from '@/config/types';
import { FaSwatchbook } from 'react-icons/fa';
import SeriesContent from './SeriesContent';

interface BrowseProps {
    series: AllPostsProp[];
}

const SeriesView = ({ series }: BrowseProps) => {
    const readingTime = series.reduce((acc, item) => {
        return acc + item.meta.readingMinutes;
    }, 0);
    return (
        <>
            <div className='animate-browse'>
                <div className='w-full gap-2 items-center flex justify-between bg-slate-600 text-white p-5 mt-10 mb-2 rounded-md'>
                    <div className='text-4xl px-10 '>{series[0].meta.series}</div>
                    <div className='flex gap-2'>
                        <FaSwatchbook className='animate-bounce' />
                        <div>{readingTime} min</div>
                    </div>
                </div>
                <SeriesContent view={series} />
            </div>
        </>
    );
};

export default SeriesView;
