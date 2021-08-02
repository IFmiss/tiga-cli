import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { typescript, prettier } = options;
  const str = `
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
        ${row(`'plugin:@typescript-eslint/eslint-recommended',`, typescript)}
        ${row(`'prettier',`, prettier)}
        ${row(`'plugin:prettier/recommended'`, prettier)}
      ],
      ${row(`parser: '@typescript-eslint/parser',`, typescript)}
      parserOptions: {
        ecmaVersion: 12,
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
      plugins: [
        'html',
        'react',
        'react-hooks',
        ${row(`'@typescript-eslint',`, typescript)}
        ${row(`'prettier'`, prettier)}
      ],
      rules: {
        ${row(`'@typescript-eslint/no-empty-interface': ['off'],`, typescript)}
        ${row(`'@typescript-eslint/camelcase': ['off'],`, typescript)}
        'react-hooks/rules-of-hooks': 'error',
        'react/prop-types': 0,
        'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
        'default-case': 'error',
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'no-empty-function': ['error', { allow: ['constructors'] }],
        'no-unused-vars': ['off'],
        semi: ['error', 'always']
      }
    };
  `;
  return tpl(str);
}
