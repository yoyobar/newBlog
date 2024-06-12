import fs from 'fs';
import path from 'path';

const BASE_DIR = 'posts';

export const allBrowseLoad = () => {
    const allItems = fs.readdirSync(path.join(BASE_DIR));
    const category = allItems.filter((item) => !item.includes('.mdx') && fs.lstatSync(path.join(BASE_DIR, item)).isDirectory());
    const mdx = allItems.filter((item) => item.includes('.mdx'));
    return { category, mdx };
};

export const allFilesLoad = (category: string[]) => {
    const files = category.flatMap((categoryItem) => {
        const fileNames = fs.readdirSync(path.join(BASE_DIR, categoryItem));
        return fileNames.map((file) => ({
            category: categoryItem,
            file,
        }));
    });
    return files;
};
