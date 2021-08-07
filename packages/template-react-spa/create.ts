import { chdir } from 'process';
import { InitShellType } from '@tiga-cli/tpl-core';
import chalk from 'chalk';
import fsExtra from 'fs-extra';

import {
  writeFileSync,
  shSync,
  logError,
  installDependencies,
  initGitHook,
  initGit,
  timer,
  pkgTool as pkgToolUtils,
  artFont
} from '@tiga-cli/utils';

import templateMap from './template/index';

export default async function renderRCC(options: InitShellType) {
  const t = timer();

  const { projectPath, pkgtool, git, name, template, commitlint } = options;

  const run = pkgToolUtils.run(pkgtool);

  const TPL_MAP = templateMap(options);

  const promiseArr: Array<Promise<unknown>> = [];
  for (const [k, v] of Object.entries(TPL_MAP)) {
    promiseArr.push(writeFileSync(`${projectPath}/${k}`, v));
  }

  try {
    await Promise.all(promiseArr);
  } catch (e) {
    logError(e);
    fsExtra.rmdir(projectPath);
  }

  chdir(projectPath);

  await installDependencies(pkgtool);

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

  // end log
  // console.clear();
  artFont('TIGA-CLI');

  console.info('');
  console.info(
    `🎉 create ${template} success!  it takes ${chalk.yellow(
      `${t.getTime()}s`
    )} \n`
  );
  console.info(` ${chalk.green('-')} cd ${name} \n`);
  console.info(` ${chalk.green('-')} ${run} serve \n`);
}
