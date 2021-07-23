import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';
import styleLintScript from './../stylelint/script';
import eslintScript from './../eslint/script';
import prettierScript from './../prettier/script';
import lintAll from './../lintall/index';

import pkgDependencies from './../dependencies';

export default function compile(options: InitShellType): string {
  const { name, stylelint, eslint, prettier, commitlint } = options;
  const { dependencies, devDependencies } = pkgDependencies(options);
  const str = `
    {
      "name": "${name}",
      "version": "0.0.1",
      "description": "demo spa",
      "main": "index.js",
      "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1",
        "serve": "webpack serve --config ./config/webpack.dev.config.js",
        "build": "webpack --config ./config/webpack.prod.config.js",
        ${row(styleLintScript, stylelint)}
        ${row(eslintScript, eslint)}
        ${row(prettierScript, prettier)}
        ${lintAll(options)}
        ${row('"pre-commit": "lint-staged"', commitlint)},
        "sort:pkg": "sort-package-json"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        ${dependencies.toString()}
      },
      "devDependencies": {
        ${devDependencies.toString()}
      }
    }
  `;
  return tpl(str);
}
