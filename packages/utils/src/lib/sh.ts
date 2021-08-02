import utils from 'util';
import { exec } from 'child_process';
import { error } from './logger';
import Spinner from './spinner';

const execAsync = utils.promisify(exec);

export default async function shAsync(
  str: string,
  options: {
    errorText?: string;
  }
): Promise<unknown> {
  const { errorText } = options;

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
      process.exit(0);
    }
  });
}
