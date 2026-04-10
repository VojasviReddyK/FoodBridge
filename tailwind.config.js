/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#F97316',
          green: '#16A34A',
        },
        accent: {
          yellow: '#FBBF24',
        },
        bg: '#FFFBF5',
        text: {
          dark: '#1C1917',
          muted: '#78716C',
        },
        card: '#FFFFFF',
        state: {
          success: '#22C55E',
          error: '#EF4444',
        },
      },
      fontFamily: {
        heading: ['Nunito', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
        brand: ['"Fredoka One"', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        glass: '0 10px 30px rgba(28,25,23,0.08)',
        lift: '0 16px 40px rgba(28,25,23,0.14)',
      },
      backgroundImage: {
        hero: 'linear-gradient(135deg, rgba(249,115,22,0.92), rgba(22,163,74,0.92))',
      },
    },
  },
  plugins: [],
}

