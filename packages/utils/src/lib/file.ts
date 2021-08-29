import fs from 'fs-extra';
import fsPath from 'fs-path';
import rimraf from 'rimraf';
const rm = rimraf.sync;

export function rmFile(str) {
  rm(str);
}

export function mkdir(dirPath: string) {
  dirPath && fs.ensureDirSync(dirPath, { mode: 0o2777 });
}

export function isDirSync(fileName: string) {
  const stat = fs.statSync(fileName);
  return stat.isDirectory();
}

export async function writeFileSync(path, value) {
  return await fsPath.writeFileSync(path, value);
}
