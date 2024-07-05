import { AllPostsProp } from '@/config/types';
import { MdAccessTimeFilled } from 'react-icons/md';
import SeriesContent from './SeriesContent';
import ExportedImage from 'next-image-export-optimizer';
import { CiBoxList } from 'react-icons/ci';
interface BrowseProps {
    blogs: AllPostsProp[];
}

function formatTime(minutes: number) {
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainderMinutes = minutes % 60;
        if (remainderMinutes > 0) {
            return `${hours} Hour ${remainderMinutes} Min`;
        } else {
            return `${hours} Hour`;
        }
    } else {
        return `${minutes} Min`;
    }
}

const SeriesView = ({ blogs }: BrowseProps) => {
    const readingTime = blogs.reduce((acc, item) => {
        return acc + item.meta.readingMinutes;
    }, 0);

    const formattedReadingTime = formatTime(readingTime);

    return (
        <div className="h-full max-w-[1100px] p-0 mx-auto">
            <div className="relative mt-10 mx-10 h-[300px]">
                <ExportedImage
                    alt={blogs[0].meta.title}
                    src={blogs[0].meta.src || '/img/template_post.webp'}
                    fill
                    sizes="(max-width: 1000px) 50vw, 450px"
                    className="object-cover m-0 p-0 rounded-xl"
                />
            </div>
            <div className="animate-browse">
                <div className="w-full gap-2 items-center flex justify-between bg-lime-700 text-white p-5 mt-10 mb-5">
                    <div className="px-4 flex gap-2 text-5xl font-[500] antialiased">
                        <CiBoxList />
                        <div className="">{blogs[0].meta.series}</div>
                    </div>
                    <div className="flex gap-2">
                        <MdAccessTimeFilled className="animate-spin" />
                        <div>{formattedReadingTime}</div>
                    </div>
                </div>
                <SeriesContent view={blogs} />
            </div>
        </div>
    );
};

export default SeriesView;
