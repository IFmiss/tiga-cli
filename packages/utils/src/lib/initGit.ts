import { info, success } from './logger';
import shSync from './shSync';

export default async function initGit() {
  info('start init git');
  shSync('git init -b master', {
    errorText: 'git init failed.',
    stdio: 'pipe'
  });
  success('git init completed ~');
}
