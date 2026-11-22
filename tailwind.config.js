/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#090A0F',
        grid: '#1A1D27',
        cyan: '#00F0FF',
        violet: '#8B5CF6',
        emerald: '#10B981',
        warm: '#F8FAFC',
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px -6px currentColor',
      },
    },
  },
  plugins: [],
}
