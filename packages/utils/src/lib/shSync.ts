import { spawnSync, StdioOptions } from 'child_process';
import { error as logError } from './logger';
import Spinner from './spinner';

export default function shSync(
  str: string,
  options: {
    stdio?: StdioOptions;
    errorText?: string;
  }
): void {
  const { errorText, stdio = 'inherit' } = options;
  const { status, stderr, error, signal, stdout } = spawnSync(str, {
    shell: true,
    stdio
  });

  if (status !== 0) {
    Spinner.close();

    if (status === null) {
      console.info('\n you canceled');
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
}
