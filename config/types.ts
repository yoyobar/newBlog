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
    toc?: boolean;
    comment: boolean;
    hidden?: boolean;
}

export interface FootMatterTypes {
    title: string;
    description: string;
    image: '';
    tags: string[];
    date: Date;
    slug: string;
    [key: string]: any;
}

export interface AllBrowseType {
    category: string[];
    mdx: string[];
}

export interface AllPostsProp {
    meta: {
        src: string;
        title: string;
        tags: string[];
        date: string;
        readingMinutes: number;
        toc?: boolean;
        category: string;
        hidden?: boolean;
    };
    slug: string;
}

export interface PlaylistItem {
    snippet: {
        title: string;
        description: string;
        resourceId: {
            videoId: string;
        };
        thumbnails: {
            default: {
                url: string;
            };
            medium: {
                url: string;
            };
            high: {
                url: string;
            };
        };
    };
    id: string;
    etag: string;
    contentDetails: {
        duration: string;
    };
}

export interface PlaylistResponse {
    items: PlaylistItem[];
}

export type DailyVisitors = {
    id: number;
    visit_date: string;
    visit_count: number;
    ip_address: string;
};

export type Database = {
    public: {
        Tables: {
            daily_visitors: {
                Row: DailyVisitors;
                Insert: Omit<DailyVisitors, 'id'>;
                Update: Partial<Omit<DailyVisitors, 'id'>>;
            };
        };
    };
};

export interface Comment {
    content: string;
    created_at: Date;
    updated_at: Date;
    name: string;
    id: string;
    admin: string;
}

export interface CommentFormType {
    name: string;
    password: string;
    path: string;
    content: string;
}
