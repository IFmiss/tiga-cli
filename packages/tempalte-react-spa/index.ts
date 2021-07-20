import { InitShellType } from '@tiga-cli/tpl-core';
import {
  writeFileSync,
  sh,
  getInstallCmd,
  logInfo,
  logError,
  logSuccess
} from '@tiga-cli/utils';
import fsExtra from 'fs-extra';

import { dependencies2Str } from './template/dependencies';

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
import webpackBase from './template/webpack/base.config';
import webpackDev from './template/webpack/dev.config';
import webpackProd from './template/webpack/prod.config';
import srcFileMap from './template/src/srcFileMap';

export default async function renderRCC(options: InitShellType) {
  const { projectPath, typescript, pkgtool } = options;

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
    ['config/webpack.base.config.js']: webpackBase(options),
    ['config/webpack.dev.config.js']: webpackDev(options),
    ['config/webpack.prod.config.js']: webpackProd(options),
    ...srcFileMap(options)
  };

  try {
    for (const [k, v] of Object.entries(TPL_MAP)) {
      await writeFileSync(`${projectPath}/${k}`, v);
    }
  } catch (e) {
    logError(e);
    fsExtra.rmdir(projectPath as any);
  }

  // Since npm pkg only supports version 7.0, use npm install to install some dependencies first
  // await sh(options.pkgtool)
  const relyMap = dependencies2Str(options);
  const errorHandler = (error) => {
    logError('install failed', error);
  };
  logInfo('start installing general dependencies 📦');
  // install dependencies
  sh(`${getInstallCmd(pkgtool)} ${relyMap.dependencies}`, { errorHandler });
  // install devDependencies
  sh(`${getInstallCmd(pkgtool)} ${relyMap.dependencies}`, { errorHandler });
  logSuccess('install customize pkg success');
}
