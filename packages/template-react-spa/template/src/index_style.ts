import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { less, sass, stylus } = options;
  let str;
  if (less || sass || stylus) {
    str = `
      body {
        margin: 0;
        padding: 0;
      }

      .main {
        padding: 10px;

        p {
          text-align: center;
        }

        a {
          color: rgb(84, 117, 207);
        }
      }
    `;
  } else {
    str = `
      body {
        margin: 0;
        padding: 0;
      }

      .main {
        padding: 10px;
      }

      p {
        text-align: center;
      }

      a {
        color: rgb(84, 117, 207);
      }`;
  }
  return tpl(str, {
    indent: -6
  });
}
