import type { InitShellType } from "@tiga-cli/tpl-core";
import { tpl } from "@tiga-cli/tpl-core";

export default function compile(options: InitShellType): string {
  const { eslint, stylelint, prettier } = options;

  if (!eslint && !stylelint && !prettier) {
    return "--rm-row--";
  }

  const lint = [
    ...(eslint ? ["npm run lint:es"] : []),
    ...(stylelint ? ["npm run lint:style"] : []),
    ...(prettier ? ["npm run lint:prettier"] : [])
  ];

  const lint_fix = [
    ...(eslint ? ["npm run lint:es:fix"] : []),
    ...(stylelint ? ["npm run lint:style:fix"] : []),
    ...(prettier ? ["npm run lint:prettier:fix"] : [])
  ];

  const str = `
    "lint": "${lint.join(" && ")}",
    \t\t"lint:fix": "${lint_fix.join(" && ")}",`;

  return tpl(str);
}
