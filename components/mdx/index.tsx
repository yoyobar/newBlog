import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import { Preview } from './modules/Preview';

const Mdx_Module = {
    Preview,
};

const Mdx_Body = ({ content }: { content: string }) => {
    return <MDXRemote source={content} components={Mdx_Module} />;
};

export default Mdx_Body;
