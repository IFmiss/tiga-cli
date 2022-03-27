import { tpl } from '@tiga-cli/tpl-core';

export default function compile(styleRuleParmas: {
  useMiniCssExtractPlugin: boolean;
  publicPath: string;
}): string {
  const { useMiniCssExtractPlugin, publicPath } = styleRuleParmas;
  const str = `{
    test: /\\.styl(us)$/,
    oneOf: [
      {
        resourceQuery: /modules/,
        use: [
          ${
            useMiniCssExtractPlugin
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
              importLoaders: 1,
              modules: {
                localIdentName: '[local]___[hash:base64:6]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, './../postcss.config.js')
              }
            }
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        use: [
          ${
            useMiniCssExtractPlugin
              ? `{
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath }
                },`
              : `'style-loader',`
          }
          'thread-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, './../postcss.config.js')
              }
            }
          },
          {
            loader: 'stylus-loader'
          }
        ]
      }
    ]
  },`;
  return tpl(str, {
    indent: 8,
    startLineIndent: true,
    endNewline: false
  });
}
