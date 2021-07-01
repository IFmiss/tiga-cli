const rm = require('rimraf').sync;
import fs from 'fs-extra';
import glob from 'glob';

export function rmFileOrDir(path: string) {
  rm(path);
}

export function rmAllFromDir(dirPath: string) {
  glob.sync(dirPath).forEach((path) => {
    console.info(path);
    rm(path);
  });
}

export async function overWriteProject() {
  const pwd = process.cwd();
  console.info(pwd);
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
