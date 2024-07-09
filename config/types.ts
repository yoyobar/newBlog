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
    update: Date;
    date: Date;
    toc?: boolean;
    comment: boolean;
    hidden?: boolean;
    series: string;
    series_src: string;
    category: string;
}

export interface FootMatterTypes {
    title: string;
    description: string;
    image: string;
    tags: string[];
    date: Date;
    slug: string;
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
        series: string;
        series_src: string;
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
export interface Comment {
    status: boolean;
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
export interface CommentStatus {
    status: boolean;
    message: string;
}
