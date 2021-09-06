import { spawnSync, SpawnSyncReturns, StdioOptions } from 'child_process';
import { chdir, cwd } from 'process';

import { error as logError } from './logger';
import Spinner from './spinner';

export default function shSync(
  str: string,
  options?: {
    stdio?: StdioOptions;
    errorText?: string;
    currentWorkingDir?: boolean;
  }
): Promise<SpawnSyncReturns<Buffer>> {
  return new Promise((resolve, reject) => {
    const {
      errorText,
      stdio = 'inherit',
      currentWorkingDir = false
    } = options || {};

    currentWorkingDir && chdir(cwd());

    const cmd = spawnSync(str, {
      shell: true,
      stdio
    });
    const { status, stderr, error, stdout } = cmd;

    if (status !== 0) {
      console.info('status', status);
      Spinner.close();

      if (status === null) {
        console.info('\n 🌟 good luck! ');
        reject(cmd);
      }

      if (errorText) {
        console.info();
        logError(errorText);
      }
      error?.message && logError(error?.message);
      stderr?.toString() && logError(stderr?.toString());
      stdout && logError(stdout);
      reject(cmd);
    }
    resolve(cmd);
  });
}
