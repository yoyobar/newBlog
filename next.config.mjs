/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        reactStrictMode: false;
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

export default nextConfig;
