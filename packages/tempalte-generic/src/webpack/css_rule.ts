/* eslint-disable prettier/prettier */
import { tpl, renderRow as row } from '@tiga-cli/tpl-core';

export default function compile(styleRuleParmas: {
  useMiniCssExtractPlugin: boolean;
  publicPath: string;
}): string {
  const { useMiniCssExtractPlugin, publicPath } = styleRuleParmas;
  const str = `{
    test: /\\.css$/,
    use: [
      'cache-loader',
      ${useMiniCssExtractPlugin
        ? `{
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath }
          },`
        : `'style-loader',`
      }
      'thread-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      },

      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            config: path.resolve(__dirname, './../postcss.config.js')
          }
        }
      }
    ]
  },`;
  return tpl(str, {
    indent: 8,
    startLineIndent: true,
    endNewline: false
  });
}
