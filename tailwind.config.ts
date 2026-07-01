import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: '#d1ca22',
        'yellow-light': '#f0efdf',
        cream: '#f7f6ec',
        'brand-black': '#111111',
        'brand-gray': '#555555',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      aspectRatio: {
        'treatment': '1 / 1',
        'portrait': '4 / 5',
      },
    },
  },
  plugins: [],
}

export default config
