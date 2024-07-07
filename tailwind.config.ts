import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                chicken: ['Ownglyph_eunbyul21-Rg', 'sans-serif'],
            },
            colors: {
                'custom-blue': '#004076',
            },
            fontSize: {
                base: '1.15rem',
                '2xl': '1.4rem',
            },
            spacing: {
                '18': '3.64rem',
            },
            height: {
                '130px': '130px',
                '275px': '275px',
            },
            animation: {
                'shake-once': 'shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) 3',
            },
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%': { transform: 'translateX(-5px)' },
                    '20%, 40%, 60%': { transform: 'translateX(5px)' },
                    '80%': { transform: 'translateX(4px)' },
                    '90%': { transform: 'translateX(-4px)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
