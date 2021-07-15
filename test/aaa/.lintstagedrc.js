module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': [
    'npm run lint:es:fix',
    'npm run lint:prettier:fix'
  ],
  'src/**/*.{css,less,scss}': [
    'npm run lint:prettier:fix'
  ]
};