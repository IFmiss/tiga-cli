import { TypePkgTool } from '@tiga-cli/tpl-core';
import checkPkgTool from './checkPkgTool';
import sh from './sh';
import { intall } from './pkgTool';
import Spinner from './spinner';

export default async function installDependencies(
  pkgtool: TypePkgTool = 'pnpm'
) {
  await checkPkgTool(pkgtool);
  Spinner.loading('installing dependencies 📦');
  const str = intall(pkgtool);
  await sh(str, {
    errorText: 'install dependencies failed'
  });
  Spinner.close();
}
