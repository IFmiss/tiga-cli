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
): SpawnSyncReturns<Buffer> {
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
  const { status, stderr, error, signal, stdout } = cmd;

  if (status !== 0) {
    Spinner.close();

    if (status === null) {
      console.info('\n 🌟 good luck! ');
      process.exit(0);
    }

    if (errorText) {
      console.info();
      logError(
        errorText,
        stderr?.toString() || '',
        error?.message,
        signal,
        stdout
      );
    }
    process.exit(0);
  }
  return cmd;
}
