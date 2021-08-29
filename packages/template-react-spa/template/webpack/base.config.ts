import {
  cssRule,
  fileRule,
  jsRule,
  lessRule,
  sassRule,
  stylusRule
} from '@tiga-cli/template-generic';
import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

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
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }
    };
  `;
  return tpl(str);
}
