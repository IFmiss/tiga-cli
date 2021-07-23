const rm = require('rimraf').sync;
import fs from 'fs-extra';

export function rmFileOrDir(path: string) {
  rm(path);
}

export function mkdir(dirPath: string) {
  dirPath && fs.ensureDirSync(dirPath, { mode: 0o2777 });
}

export async function overWriteProject() {
  const pwd = process.cwd();
}

export function isDirSync(fileName: string) {
  const stat = fs.statSync(fileName);
  return stat.isDirectory();
}

export function copy(from: string, to: string) {
  return new Promise((resolve, reject) => {
    fs.copy(from, to, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(to);
    });
  });
}
