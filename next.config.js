/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')();

module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
});
