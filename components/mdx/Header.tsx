import React from 'react';
import { FrontMatterTypes } from '@/config/types';

const Mdx_Header = ({ frontMatter }: { frontMatter: FrontMatterTypes }) => {
    return (
        <div>
            <div>{frontMatter.title}</div>
        </div>
    );
};

export default Mdx_Header;
