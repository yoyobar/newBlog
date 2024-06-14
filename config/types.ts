export enum LOADING_ENUM {
    'SMALL' = 0,
    'NORMAL' = 1,
    'LARGER' = 2,
}

export interface FrontMatterTypes {
    title: string;
    description: string;
    image: string;
    tags: string[];
    date: Date;
    [key: string]: any;
}

export interface AllBrowseType {
    category: string[];
    mdx: string[];
}
