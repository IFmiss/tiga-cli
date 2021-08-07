import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';
import {
  eslintScript,
  lintAllScript,
  stylelintScript,
  prettierScript,
  lintStagedScript
} from '@tiga-cli/template-generic';

import tiga from './tiga';
import pkgDependencies from './../dependencies';

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
        "build": "tiga build",
        ${row(stylelintScript, stylelint)}
        ${row(eslintScript, eslint)}
        ${row(prettierScript, prettier)}
        ${lintAllScript(options)}
        ${row(lintStagedScript, commitlint)}
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
