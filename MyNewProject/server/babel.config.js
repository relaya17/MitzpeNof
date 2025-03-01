module.exports = {
    presets: [
      '@babel/preset-env', // לתמיכה ב-ESNext
      '@babel/preset-react', // לתמיכה ב-JSX
      '@babel/preset-typescript' // לתמיכה ב-TypeScript
    ],
    plugins: [
      'react-refresh/babel' // אם אתה משתמש ב-React Fast Refresh (אופציונלי)
    ]
  };
  