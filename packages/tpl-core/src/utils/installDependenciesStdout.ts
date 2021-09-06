import { logInfo, shSync } from '@tiga-cli/utils';

import type { TypePkgTool } from './../types/index';
import checkPkgTool from './checkPkgTool';
import { install } from './pkgTool';

export default async function installDependenciesStdout(
  pkgtool: TypePkgTool = 'pnpm'
) {
  await checkPkgTool(pkgtool);
  logInfo('installing dependencies 📦');
  const str = install(pkgtool);
  shSync(str, {
    errorText: 'install dependencies failed',
    stdio: 'inherit'
  });
}
