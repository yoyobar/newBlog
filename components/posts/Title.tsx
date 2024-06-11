import { metaStyle, metadata } from '@/lib/metaData';

const Title = ({ type, length }: { type: string; length: number }) => {
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
                <div className='text-5xl'>
                    {titleName} ({length})
                </div>
            </div>
        </>
    );
};

export default Title;
