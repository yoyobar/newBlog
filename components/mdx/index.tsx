import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import { Preview } from './modules/Preview';
import { Image } from './modules/Image';
import { Callout } from './modules/Callout';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypePrettyCode from 'rehype-pretty-code';
// @ts-expect-error no types
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { Card, Cards } from './modules/Card';

const Mdx_Module = {
  Preview,
  Image,
  Callout,
  Card,
  Cards,
};

const options = {
  keepBackground: true,
  theme: {
    dark: 'dracula',
    light: 'one-dark-pro',
  },
  defaultLang: {
    block: 'js',
    inline: 'plaintext',
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
