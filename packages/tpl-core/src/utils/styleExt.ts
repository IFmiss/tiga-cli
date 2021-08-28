import { InitShellType } from "../types";

export default function styleExt(options: InitShellType) {
  const { less, stylus, sass } = options;
  return less ? "less" : sass ? "scss" : stylus ? "stylus" : "css";
}
