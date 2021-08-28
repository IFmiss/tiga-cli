import type { InitShellType } from "@tiga-cli/tpl-core";
import { tpl } from "@tiga-cli/tpl-core";

export const BASE_CUSTOM_CONFIG_PATH = "./";

export default function compile(options: InitShellType): string {
  const { template } = options;
  const str = `
    "tiga": {
      "type": "${template}",
      "configBasePath": "${BASE_CUSTOM_CONFIG_PATH}"
    },
  `;
  return tpl(str);
}
