import { info, success } from './logger';
import shSync from './shSync';

export default async function initGitHook() {
  info('start create git hook...');
  shSync(
    `npx husky install && npx husky add .husky/pre-commit "npm pre-commit" && npx husky add .husky/commit-msg 'npx commitlint --edit $1'`,
    {
      errorText: 'create git hook failed.',
      stdio: 'ignore'
    }
  );
  success('created git hook completed ~');
}
