import rm from 'rimraf';
import fs from 'fs-extra';
import path from 'path';

export async function rmFileOrDir(path: string) {
  rm(path);
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
