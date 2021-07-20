import { spawnSync, StdioOptions } from 'child_process';

export default function sh(
  str: string,
  options?: {
    stdio?: StdioOptions;
    errorHandler?: (error: Error | undefined) => void;
  }
): void {
  const { status, error } = spawnSync(str, {
    shell: true,
    stdio: options?.stdio || 'inherit'
  });

  if (status !== 0) {
    console.info();
    options?.errorHandler?.(error);
    process.exit(0);
  }
}
