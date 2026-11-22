/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: 'rgb(var(--bg-rgb) / <alpha-value>)',
        grid: 'rgb(var(--grid-rgb) / <alpha-value>)',
        cyan: 'rgb(var(--cyan-rgb) / <alpha-value>)',
        violet: 'rgb(var(--violet-rgb) / <alpha-value>)',
        emerald: 'rgb(var(--emerald-rgb) / <alpha-value>)',
        warm: 'rgb(var(--warm-rgb) / <alpha-value>)',
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
