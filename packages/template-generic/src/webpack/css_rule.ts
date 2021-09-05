import { tpl } from '@tiga-cli/tpl-core';

export default function compile(styleRuleParmas: {
  useMiniCssExtractPlugin: boolean;
  publicPath: string;
}): string {
  const { useMiniCssExtractPlugin, publicPath } = styleRuleParmas;
  /* eslint-disable prettier/prettier */
  const str = `{
    test: /\\.css$/,
    oneOf: [
      {
        resourceQuery: /modules/,
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
          }
        ]
      },
      {
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
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, './../postcss.config.js')
              }
            }
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
