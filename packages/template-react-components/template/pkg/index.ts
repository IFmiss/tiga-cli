import {
  commitLintScript,
  eslintScript,
  lintAllScript,
  prettierScript,
  stylelintScript
} from '@tiga-cli/template-generic';
import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

import pkgDependencies from '../dependencies';
import tiga from './tiga';

export default function compile(options: InitShellType): string {
  const { name, stylelint, eslint, prettier, commitlint } = options;
  const { dependencies, devDependencies } = pkgDependencies(options);
  const str = `
    {
      "name": "${name}",
      "version": "0.0.1",
      "description": "spa project by tiga-cli",
      "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1",
        "serve": "tiga serve",
        "publish": "tiga publish",
        "clean": "rimraf types lib esm dist",
        "build:types": "tsc --emitDeclarationOnly && cpr types/components dist/esm && cpr types/components dist/cjs",
        "build": "npm run clean && yarn build:types && gulp",
        ${row(stylelintScript, stylelint)}
        ${row(eslintScript, eslint)}
        ${row(prettierScript, prettier)}
        ${lintAllScript(options)}
        ${row(commitLintScript(options), commitlint)}
        "sort:pkg": "sort-package-json"
      },
      "author": "",
      "license": "ISC",
      ${row(tiga(options), true)}
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
