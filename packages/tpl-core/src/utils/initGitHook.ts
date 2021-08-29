import { logInfo, logSuccess, shSync } from '@tiga-cli/utils';

export default async function initGitHook() {
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
