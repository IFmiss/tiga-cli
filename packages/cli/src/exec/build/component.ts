import {
  BuildOptions,
  NODE_MODULES_PATH,
  TigaConfig
} from '@tiga-cli/tpl-core';
import { shSync } from '@tiga-cli/utils';
export default function buildComponent(
  config: TigaConfig,
  options: BuildOptions
) {
  const gulp = `${process.cwd()}/${NODE_MODULES_PATH}/gulp/bin/gulp.js`;
  shSync('npm run clean && yarn build:types', {
    stdio: 'inherit',
    currentWorkingDir: true
  });
  shSync(gulp);
}
