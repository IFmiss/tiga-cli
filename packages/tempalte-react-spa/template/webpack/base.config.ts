import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';
import jsRule from './js_rule';
import fileRule from './file_rule';

export default function compile(options: InitShellType): string {
  const str = `
    const path = require('path');

    module.exports = {
      module: {
        rules: [
          ${row(jsRule, true)}
          ${row(fileRule, true)}
        ]
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@pages': path.resolve(__dirname, '../src/pages'),
          '@components': path.resolve(__dirname, '../src/components')
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }
    };
  `;
  return tpl(str);
}
