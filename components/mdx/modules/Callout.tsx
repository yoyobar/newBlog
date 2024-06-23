import { calloutData } from '@/utils/mdx/calloutData';
import { PropsWithChildren } from 'react';

interface CalloutProps extends PropsWithChildren {
    type?: string;
}

export const Callout = (props: CalloutProps) => {
    const type = props.type || 'default';
    const metaObj = calloutData[type];
    const Icon = metaObj.icon;
    const boxClassName = metaObj.boxClass;

    return (
        <div
            className={`${boxClassName} my-6 flex items-center gap-3 rounded-md px-5 py-4`}
        >
            <div>
                <Icon />
            </div>
            <div className='font-inherit flex-1 text-white text-2xl md:text-3xl'>
                {props.children}
            </div>
        </div>
    );
};
