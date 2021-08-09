import { tpl } from '@tiga-cli/tpl-core';

export default function compile(styleRuleParmas: {
  useMiniCssExtractPlugin: boolean;
  publicPath: string;
}): string {
  const { useMiniCssExtractPlugin, publicPath } = styleRuleParmas;
  const str = `{
    test: /\\.styl(us)$/,
    use: [
      'cache-loader',
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
      },
      {
        loader: 'stylus-loader'
      }
    ]
  },`;
  return tpl(str, {
    indent: 8,
    startLineIndent: true,
    endNewline: false
  });
}
