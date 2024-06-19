import * as Icon from './IconData';

interface IconType {
    [key: string]: {
        icon: () => JSX.Element;
        boxClass: string;
    };
}

export const calloutStyle = {
    default: 'bg-slate-600 dark:bg-slate-700 text-yellow-200',
    info: 'bg-sky-600 dark:bg-sky-700 text-blue-200',
    danger: 'bg-rose-600 dark:bg-rose-700 text-rose-200',
    warn: 'bg-orange-600 text-orange-200',
};

export const calloutData: IconType = {
    info: {
        icon: Icon.InfoCallout,
        boxClass: calloutStyle.info,
    },
    danger: {
        icon: Icon.DangerCallout,
        boxClass: calloutStyle.danger,
    },
    warn: {
        icon: Icon.WarnCallout,
        boxClass: calloutStyle.warn,
    },
    default: {
        icon: Icon.DefaultCallout,
        boxClass: calloutStyle.default,
    },
};
