import { metaStyle, metadata } from '@/lib/metaData';

const Title = ({ type }: { type: string }) => {
    const metaObj = metadata[type] || metadata['all'];
    const Icon = metaObj.icon;
    const boxClassName = metaObj.boxClass;
    const titleName = metaObj.title;

    return (
        <>
            <div className='flex gap-4 ml-4 my-8 text-black dark:text-white'>
                <div className={`${boxClassName} ${metaStyle.header}`}>
                    <Icon />
                </div>
                <div className='text-5xl'>{titleName}</div>
            </div>
        </>
    );
};

export default Title;
