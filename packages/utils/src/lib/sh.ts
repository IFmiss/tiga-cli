import { exec } from 'child_process';
import { chdir, cwd } from 'process';
import utils from 'util';

import { error } from './logger';
import Spinner from './spinner';

const execAsync = utils.promisify(exec);

export default async function shAsync(
  str: string,
  options?: {
    errorText?: string;
    currentWorkingDir?: boolean;
  }
): Promise<{ stdout: string; stderr: string }> {
  const { errorText, currentWorkingDir = false } = options || {};

  currentWorkingDir && chdir(cwd());

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const data = await execAsync(str);
      resolve(data);
    } catch (e) {
      if (errorText) {
        console.info();
        error(errorText, e);
      }
      Spinner.close();
      reject(e);
    }
  });
}
