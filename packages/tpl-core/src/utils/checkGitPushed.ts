import { shSync } from '@tiga-cli/utils';

export default function checkGitPushed() {
  const { stdout } = shSync(`git status | grep -qF '0' || echo "1"`, {
    stdio: 'pipe'
  });
  if (Number(stdout.toString()) === 1) {
    return true;
  }
  return false;
}
