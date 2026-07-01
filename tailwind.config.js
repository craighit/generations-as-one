/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        warm: {
          50: '#FEF7ED',
          100: '#FDE6D3',
          200: '#FBD5B9',
          300: '#F9C49F',
          400: '#F7B385',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
        },
        soft: {
          blue: '#0EA5E9',
          gray: '#F5F5F4',
          green: '#22C55E',
        },
        text: {
          primary: '#3F3F46',
          secondary: '#71717A',
          muted: '#A1A1AA',
        },
      },
      animation: {
        'breathe': 'breathe 3s ease-in-out infinite',
        'grow': 'grow 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.95' },
        },
        grow: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
