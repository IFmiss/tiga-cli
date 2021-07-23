import { TypePkgTool } from 'tiga-cli';
import checkPkgTool from './checkPkgTool';
import sh from './sh';
import { intall } from './pkgTool';

export default async function installDependencies(
  pkgtool: TypePkgTool = 'pnpm'
) {
  await checkPkgTool(pkgtool);
  const str = intall(pkgtool);

  sh(str, {
    errorText: '初始化失败了'
  });
}
