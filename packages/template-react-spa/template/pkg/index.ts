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
      "version": "0.0.1",
      "description": "react spa project",
      "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1",
        "serve": "tiga serve",
        "build": "tiga build",
        ${row(stylelintScript, stylelint)}
        ${row(eslintScript, eslint)}
        ${row(prettierScript, prettier)}
        ${lintAllScript(options)}
        ${row(commitLintScript(options), commitlint)}
        "sort:pkg": "sort-package-json"
      },
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
