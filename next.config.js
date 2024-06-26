const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
});

module.exports = withMDX({
    images: {
        loader: 'custom',
        imageSizes: [16, 48, 96, 128, 256],
        deviceSizes: [640, 1080, 1920, 2048, 3840],
    },
    transpilePackages: ['next-image-export-optimizer'],
    env: {
        nextImageExportOptimizer_imageFolderPath: 'public/img',
        nextImageExportOptimizer_exportFolderPath: 'out',
        nextImageExportOptimizer_quality: '75',
        nextImageExportOptimizer_storePicturesInWEBP: 'true',
        nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
        nextImageExportOptimizer_generateAndUseBlurImages: 'true',
        // nextImageExportOptimizer_remoteImageCacheTTL: '86400',
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    webpack: (config, { dev, isServer }) => {
        config.module.rules.push({
            test: /\.mdx?$/,
            use: ['raw-loader', '@mdx-js/loader'],
        });

        return config;
    },
});
