import { info as logInfo } from './logger';
import sh from './sh';

export default function initGit() {
  logInfo('start init git');
  sh('git init', {
    errorText: '初始化git 失败'
  });
}
