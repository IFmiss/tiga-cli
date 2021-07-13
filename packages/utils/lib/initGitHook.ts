import { spawnSync } from 'child_process';
import { info as logInfo, error as logError } from './logger';

export default async function initGitHook() {
  logInfo('开始初始化自定义 git hook...');
  const { status } = spawnSync(
    `npx husky install && npx husky add .husky/pre-commit "npm pre-commit" && npx husky add .husky/pre-commit "npm pre-commit"`,
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
