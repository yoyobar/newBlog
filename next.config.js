const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
});

module.exports = withMDX({
    crossOrigin: 'anonymous',
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'd2wzue8j5vpr8f.cloudfront.net',
                port: '',
                pathname: '/img/**',
            },
        ],
    },
    webpack: (config, { dev, isServer }) => {
        config.module.rules.push({
            test: /\.mdx?$/,
            use: ['raw-loader', '@mdx-js/loader'],
        });

        return config;
    },
});
