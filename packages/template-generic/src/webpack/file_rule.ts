import type { InitShellType } from "@tiga-cli/tpl-core";
import { tpl } from "@tiga-cli/tpl-core";

export default function compile(options: InitShellType): string {
  const str = `
  {
    test: /\\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/i,
    dependency: { not: ['url'] },
    use: [
      'cache-loader',
      'thread-loader',
      {
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ],
    type: 'javascript/auto'
  },`;
  return tpl(str, {
    indent: 8,
    startLineIndent: true,
    endNewline: false
  });
}
