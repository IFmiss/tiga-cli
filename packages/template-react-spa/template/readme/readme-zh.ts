import type { InitShellType } from "@tiga-cli/tpl-core";
import { renderRow as row, tpl } from "@tiga-cli/tpl-core";

export default function compile(options: InitShellType): string {
  const { name } = options;
  const str = `
    # ${name}
    react-spa 单页面应用
  `;
  return tpl(str);
}
