const withExportImages = require('next-export-optimize-images');

/** @type {import('next').NextConfig} */
const nextConfig = withExportImages({
    //...
});

module.exports = nextConfig;
