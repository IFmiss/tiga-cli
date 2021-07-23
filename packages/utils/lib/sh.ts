import { spawnSync, StdioOptions } from 'child_process';
import { error as logError } from './logger';

export default function sh(
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
    if (status === null) {
      console.info('\n you canceled');
      process.exit(0);
    }
    errorText &&
      logError(
        errorText,
        stderr?.toString() || '',
        error?.message,
        signal,
        stdout
      );
    process.exit(0);
  }
}
