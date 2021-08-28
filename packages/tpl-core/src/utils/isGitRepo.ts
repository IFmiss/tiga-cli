import { shSync } from '@tiga-cli/utils';

export default function isGitRepo() {
  try {
    shSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}
