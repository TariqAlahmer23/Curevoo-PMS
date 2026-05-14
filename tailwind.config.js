/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#edf7fc',
          100: '#d8f2fb',
          500: '#1f6fb2',
          600: '#185a91',
          700: '#12304a'
        },
        success: '#2f8f69',
        progress: '#b9781d',
        pending: '#b14343'
      },
      boxShadow: {
        soft: '0 10px 28px rgba(18, 48, 74, 0.08)'
      }
    }
  },
  plugins: []
}