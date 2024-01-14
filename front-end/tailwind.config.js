/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.ts',
    './src/**/*.tsx',
  ],
  content: [],
  theme: {
    extend: {
      screens: {
        'ss': '500px',
        'xs' : '200px'
      },
      colors:{
        // sellerDashboardBody: '#393435',
        // sellerDashboardSidebar: '#403a3b'
        sellerDashboardBody: '#292624',
        sellerDashboardSidebar: '#363331'
      }
    },
  },
  plugins: [],
}

