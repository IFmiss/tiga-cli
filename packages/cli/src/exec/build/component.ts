import {
  BuildOptions,
  NODE_MODULES_PATH,
  pkgTool,
  TigaConfig
} from '@tiga-cli/tpl-core';
import { shSync } from '@tiga-cli/utils';

const { run: runFn } = pkgTool;

export default function buildComponent(
  config: TigaConfig,
  options: BuildOptions
) {
  const gulp = `${process.cwd()}/${NODE_MODULES_PATH}/gulp/bin/gulp.js`;
  const {
    tiga: { pkgTool = 'npm' }
  } = require(`${process.cwd()}/package.json`);
  const run = runFn(pkgTool);
  shSync(`${run} clean && ${run} build:types`, {
    stdio: 'inherit',
    currentWorkingDir: true
  });
  shSync(gulp);
}
