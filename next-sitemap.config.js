/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://wiki.yoyobar.xyz/',
    changefreq: 'always',
    priority: 0.7,
    sitemapSize: 7000,
    generateRobotsTxt: true,
    exclude: ['/app/api/*', '/app/calendar/*'],
};
