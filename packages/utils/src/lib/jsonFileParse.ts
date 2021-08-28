import fsExtra from "fs-extra";

import { error } from "./logger";

export default async function jsonFileParse(path: string) {
  try {
    const data = fsExtra.readFileSync(path, "utf-8");
    return Promise.resolve(JSON.parse(data));
  } catch (e) {
    if (e.errno === -2) {
      error(`文件: ${path} 不存在`);
    }
    return Promise.reject(e);
  }
}
