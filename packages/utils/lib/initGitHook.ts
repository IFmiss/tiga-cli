import { spawnSync } from 'child_process';
import { info as logInfo, error as logError } from './logger';
import sh from './sh';

export default async function initGitHook() {
  logInfo('开始初始化自定义 git hook...');
  sh(
    `npx husky install && npx husky add .husky/pre-commit "npm pre-commit" && npx husky add .husky/commit-msg 'npx commitlint --edit $1'`,
    {
      errorText: '初始化失败了',
      stdio: 'ignore'
    }
  );
}
