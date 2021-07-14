import type { InitShellType } from '@tiga-cli/tpl-core';

const ignoreWithoutStylelint = `*.less
*.scss
*.css
*.stylus
README.md
`;

const ignoreWithStylelint = `README.md
`;

export default function prettierIgnore(options: InitShellType): string {
  if (options.stylelint) {
    return ignoreWithoutStylelint;
  }
  return ignoreWithStylelint;
}
