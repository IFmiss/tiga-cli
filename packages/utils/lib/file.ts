import fs from 'fs-extra';
import fsPath from 'fs-path';

export function exists(path): Promise<boolean | fs.Stats> {
  return new Promise((resolve) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    });
  });
}

export function mkdir(dirPath: string) {
  dirPath && fs.ensureDirSync(dirPath, { mode: 0o2777 });
}

export async function writeFileSync(path, value) {
  fsPath.writeFile(path, value, function (err) {
    if (err) {
      return Promise.reject(err);
    } else {
      return Promise.resolve(true);
    }
  });
}
