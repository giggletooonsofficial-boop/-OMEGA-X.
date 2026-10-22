/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        omega: {
          950: '#07090E',
          900: '#0C1017',
          850: '#111722',
          800: '#161F2E',
          700: '#222F46',
          600: '#324463',
          accent: '#00E5FF',
          accentGlow: 'rgba(0, 229, 255, 0.15)',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};