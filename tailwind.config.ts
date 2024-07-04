import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
    darkMode: 'class',
    content: [
        './components/**/*.{js,ts,jsx,tsx,md,mdx}',
        './app/**/*.{js,ts,jsx,tsx,md,mdx}',
        './utils/**/*.{js,jsx,ts,tsx,md,mdx}',
        './posts/**/*.{js,ts,jsx,tsx,md,mdx}',
    ],
    theme: {
        screens: {
            ...defaultTheme.screens,
            '3xl': '1920px',
        },
        extend: {
            backgroundImage: {
                dark: "url('/img/main-bg.webp')",
            },
            transitionProperty: {
                'width-height': 'width, height',
            },
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
                slideCategory: {
                    '0%': {
                        left: '7rem',
                        opacity: '0.1',
                    },
                    '100%': {
                        left: '11rem',
                        opacity: '1',
                    },
                },
                slide: {
                    '0%': {
                        opacity: '0',
                        height: '0px',
                    },
                    '100%': {
                        opacity: '1',
                        height: '100%',
                    },
                },
                browse: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(-10px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0px)',
                    },
                },
            },
            animation: {
                popUp: 'popUp 0.3s ease-out 1',
                slide: 'slide 0.3s ease-out 1',
                slideCategory: 'slideCategory 0.3s ease-out 1',
                browse: 'browse 0.5s ease-out 1',
            },
            colors: {
                background: {
                    DEFAULT: '#18181b',
                },
                header: {
                    DEFAULT: '#302b25',
                    text: '#ededed',
                },
                whiteInner: {
                    header: '#ededed',
                    content: '#eaeef4',
                    border: '#999b9d',
                },
                darkInner: {
                    header: '#3a3b45',
                    content: '#292a35',
                    border: '#454b5c',
                    background: '#18181b',
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        // ! figure
                        figure: {
                            margin: 0,
                            padding: 0,
                        },

                        // ! <p> 태그
                        p: {
                            fontSize: '1.8rem',
                            lineHeight: '2em',
                            '@media screen and (max-width: 768px)': {
                                lineHeight: '1.5em',
                                fontSize: '1.6rem',
                            },
                        },

                        // ! LINK 태그

                        'p > a': {
                            color: '#f43f5e',
                        },

                        // ! 인라인 코드 블럭
                        ':not(pre) > code': {
                            display: 'inline-block',
                            padding: '0 5px',
                            lineHeight: '1.5em',
                            fontWeight: 'inherit',
                            fontFamily: 'inherit',
                            backgroundColor: '#eaeef4',
                            borderRadius: '3px',
                            textWarp: 'break-words',
                        },

                        ':not(pre) > p > span > code': {
                            textWarp: 'break-words',
                            margin: '3px 5px',
                        },

                        ':not(pre) > code > span > span': {
                            color: 'var(--shiki-light)',
                        },

                        '.dark :not(pre) > code > span > span': {
                            color: 'var(--shiki-dark)',
                        },

                        '.dark :not(pre) > code': {
                            backgroundColor: '#292a35',
                        },

                        'code::before': {
                            content: 'none',
                        },

                        'code::after': {
                            content: 'none',
                        },

                        // ! 넘버링 문법
                        code: {
                            counterReset: 'line',
                        },

                        // ! 넘버링 스타일
                        'code[data-line-numbers] > [data-line]::before': {
                            counterIncrement: 'line',
                            content: 'counter(line)',
                            display: 'inline-block',
                            width: '1rem',
                            marginRight: '1.4rem',
                            textAlign: 'right',
                            color: 'lightgrey',
                            fontSize: '1.2rem',
                        },
                        'code[data-line-numbers-max-digits="2"] > [data-line]::before': {
                            width: '1rem',
                        },
                        'code[data-line-numbers-max-digits="3"] > [data-line]::before': {
                            width: '2rem',
                        },

                        //! 코드 블럭
                        pre: {
                            backgroundColor: 'var(--shiki-light-bg)',
                            border: '1px solid #e5e7eb',
                            margin: 'auto',

                            '@media screen and (max-width: 768px)': {
                                fontSize: '1.4rem',
                            },
                        },

                        //! 언더라인
                        u: {
                            textUnderlineOffset: '4px',
                            textDecorationThickness: 1,
                            fontWeight: 600,
                        },

                        //! ul

                        ul: {
                            fontSize: '1.8rem',
                            lineHeight: '2em',
                            '@media screen and (max-width: 768px)': {
                                lineHeight: '1.5em',
                                fontSize: '1.6rem',
                            },
                        },
                        'ul::marker': {
                            color: 'tomato',
                        },
                        //! li

                        li: {
                            fontSize: '1.8rem',
                            lineHeight: '2em',
                            '@media screen and (max-width: 768px)': {
                                lineHeight: '1.5em',
                                fontSize: '1.6rem',
                            },
                        },
                        'li::marker': {
                            color: 'tomato',
                        },
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
} satisfies Config;
export default config;
