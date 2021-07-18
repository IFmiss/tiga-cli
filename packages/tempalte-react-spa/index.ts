import { InitShellType } from '@tiga-cli/tpl-core';
import { writeFileSync } from '@tiga-cli/utils';
import fsExtra from 'fs-extra';

import commitlintConfig from './template/commitlint/config';
import eslintIgnore from './template/eslint/ignore';
import babelConfig from './template/babel/config';
import eslintConfig from './template/eslint/config';
import gitIgnore from './template/git/ignore';
import liststagedConfig from './template/lintstaged/config';
import prettierConfig from './template/prettier/config';
import prettierIgnore from './template/prettier/igonre';
import stylelintConfig from './template/stylelint/config';
import postcssConfig from './template/postcss/config';
import readme from './template/readme/readme';
import readmeZH from './template/readme/readme-zh';
import tiga from './template/tiga/index';
import tsConfig from './template/typescript/config';
import packageJson from './template/pkg/index';
import declaration from './template/declaration/index';
import srcFileMap from './template/src/srcFileMap';

export default async function renderRCC(options: InitShellType) {
  const { projectPath, typescript } = options;

  const TPL_MAP = {
    [`.commitlintrc.js`]: commitlintConfig,
    ['.eslintignore']: eslintIgnore,
    ['.babelrc.js']: babelConfig(options),
    ['.eslintrc.js']: eslintConfig(options),
    ['.gitignore']: gitIgnore,
    ['.lintstagedrc.js']: liststagedConfig(options),
    ['.prettierrc.js']: prettierConfig,
    ['.prettierignore']: prettierIgnore(options),
    ['.stylelintrc.js']: stylelintConfig,
    ['postcss.config.js']: postcssConfig(options),
    ['README.md']: readme(options),
    ['README-zh.md']: readmeZH(options),
    ['tiga.config.js']: tiga(options),
    ['tsconfig.json']: tsConfig,
    ['package.json']: packageJson(options),
    ...(typescript ? { ['src/global.d.ts']: declaration } : null),
    ...srcFileMap(options)
  };

  try {
    for (const [k, v] of Object.entries(TPL_MAP)) {
      await writeFileSync(`${projectPath}/${k}`, v);
    }
  } catch (e) {
    console.error(e);
    fsExtra.rmdir(projectPath as any);
  }
}
