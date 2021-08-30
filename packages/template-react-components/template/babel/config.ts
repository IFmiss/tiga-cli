import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType) {
  const { typescript } = options;

  const str = `
    module.exports = function (api) {
      api.cache(false);
      const presets = [
        [
          '@babel/preset-env'
          // {
          //   useBuiltIns: false,
          //   targets: {
          //     chrome: '58',
          //     ie: '11'
          //   }
          // }
        ],
        '@babel/preset-react',
        ${row(`'@babel/preset-typescript'`, typescript)}
      ];

      const plugins = [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: { version: 3, proposals: true },
            helpers: true,
            regenerator: true
          }
        ]
      ];

      const env = {
        esm: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                useBuiltIns: false
              }
            ]
          ],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true
              }
            ]
          ]
        }
      };

      return {
        env,
        presets,
        plugins
      };
    };
  `;
  return tpl(str);
}
