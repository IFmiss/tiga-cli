import chalk from 'chalk';
import { InitShellType } from '@tiga-cli/tpl-core';
import {
  writeFileSync,
  shSync,
  logError,
  installDependenciesStdout,
  rmFile,
  initGitHook,
  initGit,
  timer,
  pkgTool as pkgToolUtils,
  artFont
} from '@tiga-cli/utils';

import {
  commitlintConfig,
  gitIgnore,
  eslintIgnore,
  eslintConfig,
  prettierConfig,
  prettierIgnore,
  stylelintConfig,
  postcssConfig,
  tigaConfig,
  lintstagedConfig,
  vscodeTplMap
} from '@tiga-cli/tempalte-generic';

import babelConfig from './template/babel/config';
import readme from './template/readme/readme';
import readmeZH from './template/readme/readme-zh';
import tsConfig from './template/typescript/config';
import packageJson from './template/pkg/index';
import declaration from './template/declaration/index';
import webpackBase from './template/webpack/base.config';
import webpackDev from './template/webpack/dev.config';
import webpackProd from './template/webpack/prod.config';
import srcFileMap from './template/src/srcFileMap';

export default async function renderRCC(options: InitShellType) {
  const t = timer();

  const { typescript, pkgtool, git, commitlint, name, template, initFile } =
    options;

  const run = pkgToolUtils.run(pkgtool);

  const TPL_MAP = {
    [`.commitlintrc.js`]: commitlintConfig,
    ['.eslintignore']: eslintIgnore,
    ['.babelrc.js']: babelConfig(options),
    ['.eslintrc.js']: eslintConfig(options),
    ['.gitignore']: gitIgnore,
    ['.lintstagedrc.js']: lintstagedConfig(options),
    ['.prettierrc.js']: prettierConfig,
    ['.prettierignore']: prettierIgnore(options),
    ['.stylelintrc.js']: stylelintConfig,
    ['postcss.config.js']: postcssConfig(options),
    ['README.md']: readme(options),
    ['README-zh.md']: readmeZH(options),
    ['tiga.config.js']: tigaConfig(options),
    ['tsconfig.json']: tsConfig,
    ['package.json']: packageJson(options),
    ...(typescript ? { ['src/global.d.ts']: declaration } : null),
    ['config/webpack.base.config.js']: webpackBase(options),
    ['config/webpack.dev.config.js']: webpackDev(options),
    ['config/webpack.prod.config.js']: webpackProd(options),
    ...srcFileMap(options),
    ...vscodeTplMap()
  };

  const promiseArr: Array<Promise<unknown>> = [];
  for (const [k, v] of Object.entries(TPL_MAP)) {
    promiseArr.push(writeFileSync(`./${k}`, v));
  }

  try {
    await Promise.all(promiseArr);
  } catch (e) {
    logError(e);
  }

  await installDependenciesStdout(pkgtool);

  // initGit and hooks
  if (commitlint) {
    initGit();
    initGitHook();
  } else {
    git && initGit();
  }

  shSync(`${run} sort:pkg`, {
    errorText: 'sort package.json faild',
    stdio: 'ignore'
  });

  rmFile(initFile);

  // end log
  // console.clear();
  artFont('TIGA-CLI');

  console.info('');
  console.info(
    `🎉 init ${template} success!  it takes ${chalk.yellow(
      `${t.getTime()}s`
    )} \n`
  );
  console.info(` ${chalk.green('-')} cd ${name} \n`);
  console.info(` ${chalk.green('-')}  ${run} serve \n`);
}
