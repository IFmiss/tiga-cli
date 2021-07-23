import { chdir } from 'process';
import { InitShellType } from '@tiga-cli/tpl-core';
import {
  writeFileSync,
  sh,
  logInfo,
  logError,
  logSuccess,
  installDependencies,
  initGitHook,
  initGit,
  timer,
  pkgTool as pkgToolUtils
} from '@tiga-cli/utils';
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
import webpackBase from './template/webpack/base.config';
import webpackDev from './template/webpack/dev.config';
import webpackProd from './template/webpack/prod.config';
import srcFileMap from './template/src/srcFileMap';
import chalk from 'chalk';

export default async function renderRCC(options: InitShellType) {
  const t = timer();

  const { projectPath, typescript, pkgtool, git, commitlint, name, template } =
    options;
  const run = pkgToolUtils.run(pkgtool);

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

  const promiseArr: Array<Promise<any>> = [];
  for (const [k, v] of Object.entries(TPL_MAP)) {
    promiseArr.push(writeFileSync(`${projectPath}/${k}`, v));
  }

  try {
    await Promise.all(promiseArr);
  } catch (e) {
    logError(e);
    fsExtra.rmdir(projectPath as any);
  }

  chdir(projectPath);

  logInfo('start installing dependencies 📦');
  await installDependencies(pkgtool);

  // initGit and hooks
  if (commitlint) {
    initGit();
    initGitHook();
  } else {
    git && initGit();
  }

  sh(`${run} sort:pkg`, {
    errorText: 'sort package.json faild',
    stdio: 'ignore'
  });

  // end log
  // console.clear();
  console.info('');
  console.info(
    `✨ create ${template} success!  timer run for ${chalk.yellow(
      `${t.getTime()}s`
    )} \n`
  );
  console.info(`    cd ${name} \n`);
  console.info(`    ${run} serve \n`);
}
