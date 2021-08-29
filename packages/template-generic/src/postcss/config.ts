import type { InitShellType } from '@tiga-cli/tpl-core';
import { renderRow as row, tpl } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { layout } = options;
  const str = `
    module.exports = {
      plugins: [
        require('autoprefixer')({
          grid: true
        }),
        require('postcss-preset-env'),
        ${row(
          `require('postcss-px-to-viewport')({
            viewportWidth: 375,
            viewportHeight: 1334,
            unitPrecision: 3, // 设置的保留小数位数（Number）
            viewportUnit: 'vw', // 转换的单位（String）
            fontViewportUnit: 'vw', // 字体转换的单位（String）
            selectorBlackList: ['.ignore', '.hairlines'], // 不需要进行转换的类名（String[]）
            minPixelValue: 1, // 设置要替换的最小像素值（Number）
            mediaQuery: false // 允许在媒体查询中转换px（Boolean）
            // more info to https://github.com/evrone/postcss-px-to-viewport#usage
          })`,
          layout === 'viewport'
        )}
      ]
    };
  `;
  return tpl(str);
}
