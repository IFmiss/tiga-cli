import { logInfo, logSuccess, sh, shSync } from '@tiga-cli/utils';

/** 是否是干净的项目 */
export async function isWorkingTreeClean() {
  try {
    const { stdout } = await sh('git status --porcelain');

    if (stdout !== '') {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

/** 初始化git项目 */
export async function initGit() {
  logInfo('start init git');
  shSync('git init -b master', {
    errorText: 'git init failed.',
    stdio: 'pipe'
  });
  logSuccess('git init completed ~');
}

/** 初始化git hook */
export async function initGitHook() {
  logInfo('start create git hook...');
  shSync(
    `npx husky install &&
    npx husky add .husky/pre-commit "npm run pre-commit" &&
    npx husky add .husky/commit-msg 'npx commitlint --edit $1'`,
    {
      errorText: 'create git hook failed.',
      stdio: 'ignore'
    }
  );
  logSuccess('created git hook completed ~');
}

/** 判断是否是git 项目 */
export function isGitRepo() {
  try {
    shSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

/** 获取最后一个tag 信息 */
export async function lastGitTag() {
  const { stdout } = await sh('git describe --abbrev=0 --tags');
  console.info('stdout', stdout, typeof stdout);
  return stdout;
}

/** 根据tag 名称删除tag */

export const deleteTag = (tagName: string) => {
  shSync(`git tag --delete ${tagName}`, {
    stdio: 'inherit'
  });
};

/** 移除最后一次提交 */
export const removeLastCommit = async () => {
  shSync(`git reset --hard HEAD~1`, {
    stdio: 'inherit'
  });
};

/** 获取 tag version 的prefix 的值 */
export const getVersionTagPrefix = async () => {
  try {
    const { stdout } = await sh('npm config get tag-version-prefix');
    return stdout;
  } catch {
    return 'v';
  }
};
