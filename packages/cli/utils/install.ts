import { RenderTemplateOptions } from './../constants';
import { spawnSync } from 'child_process';
import checkPkgTool from './checkPkgTool';
import { error, info } from './logger';

const INSTALL_MAP = {
  yarn: 'yarn',
  npm: 'npm install',
  pnpm: 'pnpm install'
};

export default async function install(renderTplOptions: RenderTemplateOptions) {
  info('开始安装依赖...');
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
    error('初始化失败了');
    process.exit(0);
  }
}
