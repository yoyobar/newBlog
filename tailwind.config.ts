import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
    darkMode: 'class',
    content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './utils/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            ...defaultTheme.screens,
            '3xl': '1920px',
        },
        extend: {
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
                        left: '1rem',
                        opacity: '0.1',
                    },
                    '100%': {
                        left: '3rem',
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
            },
            animation: {
                popUp: 'popUp 0.3s ease-out 1',
                slide: 'slide 0.3s ease-out 1',
                slideCategory: 'slideCategory 0.3s ease-out 1',
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
            typography: {
                DEFAULT: {
                    css: {
                        // ! <p> 태그
                        p: {
                            marginTop: '2rem',
                            marginBottom: '2rem',
                            wordWrap: 'break-word',
                            fontSize: '1.8rem',
                        },

                        // ! 인라인 코드 블럭
                        ':not(pre) > code': {
                            display: 'inline-block',
                            fontWeight: 'inherit',
                            fontFamily: 'Consolas, Courier New, Courier, monospace',
                            wordWrap: 'break-word',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '3px',
                            textAlign: 'center',
                        },

                        ':not(pre) > code > span > span': {
                            color: 'var(--shiki-light)',
                        },

                        '.dark :not(pre) > code > span > span': {
                            color: 'var(--shiki-dark)',
                        },

                        '.dark :not(pre) > code': {
                            backgroundColor: '#282a37',
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
                            overflow: 'scroll',
                        },

                        '.dark pre': {
                            backgroundColor: 'var(--shiki-dark-bg)',
                            color: 'var(--shiki-dark)',
                            border: '1px solid #374151',
                        },
                        'pre > code > span': {
                            padding: '1.1rem',
                            paddingRight: '1.1rem',
                        },
                        'pre code span': {
                            color: 'var(--shiki-light)',
                        },
                        '.dark pre code span': {
                            color: 'var(--shiki-dark)',
                        },
                        '[data-highlighted-line]': {
                            backgroundColor: 'rgba(253, 224, 71, 0.2)',
                        },

                        //! 언더라인
                        u: {
                            textUnderlineOffset: '4px',
                            textDecorationThickness: 1,
                            fontWeight: 600,
                        },
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
} satisfies Config;
export default config;
