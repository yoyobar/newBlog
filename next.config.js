const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
});

module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    webpack: (config, { dev, isServer }) => {
        // MDX 파일을 처리하는 웹팩 로더 설정 추가
        config.module.rules.push({
            test: /\.mdx?$/,
            use: ['raw-loader', '@mdx-js/loader'],
        });

        return config;
    },
});
