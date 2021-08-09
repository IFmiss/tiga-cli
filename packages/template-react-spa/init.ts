import chalk from 'chalk';

import {
  InitShellType,
  installDependenciesStdout,
  initGitHook,
  initGit,
  pkgTool as pkgToolUtils,
  artFont
} from '@tiga-cli/tpl-core';

import {
  writeFileSync,
  shSync,
  logError,
  rmFile,
  timer
} from '@tiga-cli/utils';

import templateMap from './template/index';

export default async function renderRCC(options: InitShellType) {
  const t = timer();

  const { pkgtool, git, commitlint, name, template, initFile } = options;

  const run = pkgToolUtils.run(pkgtool);

  const TPL_MAP = templateMap(options);

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

  console.info();
  console.info(
    `🎉 init ${template} success!  it takes ${chalk.yellow(
      `${t.getTime()}s`
    )} \n`
  );
  console.info(` ${chalk.green('-')} cd ${name} \n`);
  console.info(` ${chalk.green('-')} ${run} serve \n`);
}
