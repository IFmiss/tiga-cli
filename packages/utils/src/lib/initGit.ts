import { info as logInfo, success as logSuccess } from './logger';
import sh from './sh';

export default async function initGit() {
  logInfo('start init git');
  sh('git init -b master', {
    errorText: '初始化git失败',
    stdio: 'pipe'
  });
  logSuccess('初始化git成功');
}
