import {
  commitLintScript,
  eslintScript,
  lintAllScript,
  prettierScript,
  stylelintScript,
  tigaPkgConfig
} from '@tiga-cli/template-generic';
import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

import pkgDependencies from '../dependencies';

export default function compile(options: InitShellType): string {
  const { name, stylelint, eslint, prettier, commitlint } = options;
  const { dependencies, devDependencies } = pkgDependencies(options);
  const str = `
    {
      "name": "${name}",
      "version": "0.0.0",
      "description": "react components",
      "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1",
        "serve": "tiga serve",
        "release": "tiga publish",
        "clean": "rimraf dist",
        "build:types": "tsc --emitDeclarationOnly && cpr types/components dist/esm && cpr types/components dist/cjs && rimraf types",
        "build": "npm run clean && yarn build:types && gulp",
        "build:site": "tiga build",
        ${row(stylelintScript, stylelint)}
        ${row(eslintScript, eslint)}
        ${row(prettierScript, prettier)}
        ${lintAllScript(options)}
        ${row(commitLintScript(options), commitlint)}
        "sort:pkg": "sort-package-json"
      },
      "files": [
        "dist"
      ],
      "author": "",
      "license": "ISC",
      ${row(tigaPkgConfig(options), true)}
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
