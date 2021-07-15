import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';
import styleLintScript from './../stylelint/script';
import eslintScript from './../eslint/script';
import prettierScript from './../prettier/script';
import lintAll from './../lintall/index';

export default function compilePostcssConfig(options: InitShellType): string {
  const { name, stylelint, eslint, prettier, commitlint } = options;
  const str = `
    {
      "name": "${name}",
      "version": "0.0.1",
      "description": "demo spa",
      "main": "index.js",
      "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1",
        "serve": "webpack serve --config ./config/webpack.dev.js",
        ${row(styleLintScript, stylelint)}
        ${row(eslintScript, eslint)}
        ${row(prettierScript, prettier)}
        ${lintAll(options)}
        ${row('"pre-commit": "lint-staged"', commitlint)}
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
      },
      "devDependencies": {
        "css-loader": "^5.2.6",
        "file-loader": "^6.2.0",
        "html-webpack-plugin": "^5.3.2",
        "style-loader": "^3.0.0",
        "url-loader": "^4.1.1"
      }
    }
  `;
  return tpl(str);
}
