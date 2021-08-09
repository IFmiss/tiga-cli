import { tpl } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';

export default function compile(options: InitShellType): string {
  const { name, typescript } = options;
  const publicPath = `''`;
  const reactExt = typescript ? 'tsx' : 'jsx';
  const str = `
    const path = require('path');
    const baseConfig = require('./webpack.base.config');
    const webpack = require('webpack');
    const { merge } = require('webpack-merge');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const WebpackPromptPlugin = require('webpack-prompt-plugin');

    const publicPath = ${publicPath};
    const srcPath = path.resolve(__dirname, './../src');

    module.exports = merge(baseConfig, {
      mode: 'development',
      entry: path.join(srcPath, 'index.${reactExt}'),
      output: {
        publicPath: '/',
        filename: 'js/[name].[contenthash:8].js',
        path: path.resolve(__dirname, '../dist')
      },
      devtool: 'inline-source-map',
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          path: srcPath,
          template: path.join(srcPath, 'index.html'),
          title: '${name}',
          // favicon: 'src/...'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackPromptPlugin()
      ],
      cache: {
        // 将缓存类型设置为文件系统,默认是memory
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, './../', '.temp_cache'),
        buildDependencies: {
          // 更改配置文件时，重新缓存
          config: [__filename]
        }
      },
      devServer: {
        overlay: true,
        historyApiFallback: true
      }
    });
  `;
  return tpl(str);
}
