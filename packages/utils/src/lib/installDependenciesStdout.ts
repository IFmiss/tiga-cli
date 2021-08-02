import { TypePkgTool } from '@tiga-cli/tpl-core';
import checkPkgTool from './checkPkgTool';
import shSync from './shSync';
import { intall } from './pkgTool';
import { info } from './logger';

export default async function installDependencies(
  pkgtool: TypePkgTool = 'pnpm'
) {
  await checkPkgTool(pkgtool);
  info('installing dependencies 📦');
  const str = intall(pkgtool);
  shSync(str, {
    errorText: 'install dependencies failed'
  });
}
