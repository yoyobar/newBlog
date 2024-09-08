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
                hostname: 'd1su9fsid9aw3f.cloudfront.net',
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
    async redirects() {
        return [
            {
                source: '/api/comments',
                destination: '/',
                permanent: true,
            },
            {
                source: '/api/playdetail',
                destination: '/',
                permanent: true,
            },
            {
                source: '/api/playlist',
                destination: '/',
                permanent: true,
            },
        ];
    },
});
