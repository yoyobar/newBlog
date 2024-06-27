/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://trouble-wiki.vercel.app',
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 7000,
    generateRobotsTxt: true,
    exclude: ['/app/api/*', '/app/calendar/*'],
};
