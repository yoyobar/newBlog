import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            keyframes: {
                popUp: {
                    '0%': {
                        top: '0',
                        opacity: '0.1',
                    },
                    '100%': {
                        top: '3rem',
                        opacity: '0.9',
                    },
                },

                pageOn: {
                    '0%': {
                        scale: '0%',
                    },
                    '100%': {
                        scale: '100%',
                    },
                },
                pageOff: {
                    '0%': {
                        scale: '100%',
                    },
                    '100%': {
                        scale: '0%',
                    },
                },
            },
            animation: {
                popUp: 'popUp 0.3s ease-out 1',
                pageOn: 'pageOn 0.3s ease-out 1',
                pageOff: 'pageOff 0.3s ease-out 1',
            },
            colors: {
                background: {
                    DEFAULT: '#222222',
                },
                header: {
                    DEFAULT: '#302b25',
                    text: '#ddd',
                },
            },
        },
    },
    plugins: [],
};
export default config;
