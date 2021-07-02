module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: ['/node_modules/', '/dist/'],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-empty-interface': ['off'],
    '@typescript-eslint/camelcase': ['off'],
    'react-hooks/rules-of-hooks': 'error',
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'default-case': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-unused-vars': ['off'],
    semi: ['error', 'always']
  }
};
