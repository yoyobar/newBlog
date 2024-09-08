/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://wiki.yoyobar.xyz/',
    changefreq: 'always',
    priority: 0.7,
    sitemapSize: 7000,
    generateRobotsTxt: true,
    exclude: ['/server-sitemap-index.xml'],
    robotsTxtOptions: {
        additionalSitemaps: ['https://wiki.yoyobar.xyz/server-sitemap-index.xml'],
    },
};
