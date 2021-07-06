import { RenderTemplateOptions } from 'tiga-cli';
import { spawnSync } from 'child_process';
import { info as logInfo, error as logError } from './logger';
import checkPkgTool from './checkPkgTool';

const INSTALL_MAP = {
  yarn: 'yarn',
  npm: 'npm install',
  pnpm: 'pnpm install'
};

export default async function installDependencies(
  renderTplOptions: RenderTemplateOptions
) {
  logInfo('开始安装依赖...');
  const { pkgtool, projectPath } = renderTplOptions;
  await checkPkgTool(pkgtool);

  const { status } = spawnSync(
    `cd ${projectPath} && ${INSTALL_MAP[pkgtool]} --color`,
    {
      shell: true,
      stdio: 'inherit'
    }
  );
  if (status !== 0) {
    console.info();
    logError('初始化失败了 method [installDependencies]');
    process.exit(0);
  }
}
