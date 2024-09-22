/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
      colors: {
        // primary: 'var(--color-primary)', // переменная из CSS
        // secondary: 'var(--color-secondary)',
        primary: '#2b6e7e', // кастомное значение цвета
      },
    },
	},
	plugins: []
}
