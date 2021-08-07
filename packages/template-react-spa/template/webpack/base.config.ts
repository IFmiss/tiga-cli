import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';
import {
  jsRule,
  fileRule,
  cssRule,
  lessRule,
  sassRule,
  stylusRule
} from '@tiga-cli/template-generic';

export default function compile(options: InitShellType): string {
  const { less, sass, stylus, typescript } = options;
  const publicPath = `''`;
  const str = `
    const path = require('path');

    module.exports = {
      module: {
        rules: [
          ${row(cssRule({ useMiniCssExtractPlugin: false, publicPath }), true)}
          ${row(lessRule({ useMiniCssExtractPlugin: false, publicPath }), less)}
          ${row(sassRule({ useMiniCssExtractPlugin: false, publicPath }), sass)}
          ${row(
            stylusRule({ useMiniCssExtractPlugin: false, publicPath }),
            stylus
          )}
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
