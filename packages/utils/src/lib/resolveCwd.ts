import path from "path";

export default function resolveCwd(relativePath: string, customCwd?: string) {
  const cwd = customCwd ? customCwd : process.cwd();
  return path.join(cwd, relativePath);
}
