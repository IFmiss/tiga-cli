import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';
import { jsRule, fileRule } from '@tiga-cli/tempalte-generic';

export default function compile(options: InitShellType): string {
  const str = `
    const path = require('path');

    module.exports = {
      module: {
        rules: [
          ${row(jsRule(options), true)}
          ${row(fileRule(options), true)}
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
