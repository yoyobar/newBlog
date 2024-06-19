import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypePrettyCode from 'rehype-pretty-code';
// @ts-expect-error no types
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
// Modules
import { Preview } from './modules/Preview';
import { Image } from './modules/Image';
import { Callout } from './modules/Callout';
import { Card, Cards } from './modules/Card';
import { CodeBlock } from './modules/CodeBlock';
import { Blockquote } from './modules/Blockquote';
import { Table, Td, Th, Tr } from './modules/Table';
import { Hr } from './modules/Hr';
import rehypeSlug from 'rehype-slug';
import { Strong } from './modules/Strong';
import Pen from './modules/Pen';

const Mdx_Module = {
    Pen,
    Preview,
    Callout,
    Card,
    Cards,
    img: Image as any,
    strong: Strong,
    blockquote: Blockquote,
    pre: CodeBlock,
    tr: Tr,
    th: Th,
    td: Td,
    table: Table,
    hr: Hr,
};

const options = {
    keepBackground: true,
    theme: {
        dark: 'min-dark',
        light: 'one-light',
    },
    defaultLang: {
        block: 'js',
        inline: 'js',
    },
};

const Mdx_Body = async ({ content }: { content: string }) => {
    return (
        <MDXRemote
            options={{
                mdxOptions: {
                    remarkPlugins: [
                        // GitHub Flavored Markdown
                        remarkGfm,
                        // Accessibility for emojis
                        remarkA11yEmoji,
                        // Line breaks in MDX
                        remarkBreaks,
                    ],
                    rehypePlugins: [
                        // Pretty Code Block (Shiki)
                        [rehypePrettyCode, options],
                        rehypeSlug,
                    ],
                    format: 'mdx',
                },
            }}
            source={content}
            components={Mdx_Module}
        />
    );
};

export default Mdx_Body;
