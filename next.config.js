const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
});

module.exports = withMDX({
    images: {
        loader: 'custom',
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    transpilePackages: ['next-image-export-optimizer'],
    env: {
        nextImageExportOptimizer_imageFolderPath: 'public/img',
        nextImageExportOptimizer_exportFolderPath: 'out',
        nextImageExportOptimizer_quality: '75',
        nextImageExportOptimizer_storePicturesInWEBP: 'true',
        nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
        nextImageExportOptimizer_generateAndUseBlurImages: 'true',
        nextImageExportOptimizer_remoteImageCacheTTL: '0',
    },
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
