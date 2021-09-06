import { sh, Spinner } from '@tiga-cli/utils';

import type { TypePkgTool } from './../types/index';
import checkPkgTool from './checkPkgTool';
import { install } from './pkgTool';

export default async function installDependencies(
  pkgtool: TypePkgTool = 'pnpm'
) {
  await checkPkgTool(pkgtool);
  Spinner.loading('installing dependencies 📦');
  const str = install(pkgtool);
  await sh(str, {
    errorText: 'install dependencies failed'
  });
  Spinner.close();
}
