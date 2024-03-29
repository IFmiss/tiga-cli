module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
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
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-empty-interface': ['off'],
    '@typescript-eslint/camelcase': ['off'],

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'default-case': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-unused-vars': ['off'],
    semi: ['error', 'always']
  }
};
