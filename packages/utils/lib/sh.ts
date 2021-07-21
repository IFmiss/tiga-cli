import { spawnSync, StdioOptions } from 'child_process';
import { error as logError } from './logger';

export default function sh(
  str: string,
  options?: {
    stdio?: StdioOptions;
    errorText?: string;
  }
): void {
  const { errorText } = (options = { errorText: 'failed' });
  const { status, stderr } = spawnSync(str, {
    shell: true,
    stdio: options?.stdio || 'inherit'
  });

  if (status !== 0) {
    console.info();
    logError('install failed', stderr.toString());
    errorText && logError(errorText);
    process.exit(0);
  }
}
