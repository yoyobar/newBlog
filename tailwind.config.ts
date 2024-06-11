import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './lib/**/*.{js,jsx,ts,tsx}',
    ],
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
                        width: '250px',
                        opacity: '0.1',
                    },
                    '100%': {
                        width: '300px',
                        opacity: '1',
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
                        },

                        // ! 인라인 코드 블럭
                        ':not(pre) > code': {
                            display: 'inline-block',
                            color: 'red',
                            fontWeight: 'inherit',
                            margin: '0.2rem 1rem',
                            backgroundColor: '#bae6fd',
                            fontFamily: '"SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace',
                            borderRadius: 3,
                            padding: '0.2rem 0.4rem',
                            overflowWrap: 'break-word',
                            textAlign: 'center',
                        },

                        '.dark :not(pre) > code': {
                            backgroundColor: '#282a37',
                            color: 'orange',
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

                            '@media (max-width: 1024px)': {
                                pre: {
                                    width: '100%',
                                },
                            },
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
