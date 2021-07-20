import { tpl, renderRow as row } from '@tiga-cli/tpl-core';
import type { InitShellType } from '@tiga-cli/tpl-core';
import cssRule from './css_rule';
import lessRule from './less_rule';
import sassRule from './sass_rule';

export default function compile(options: InitShellType): string {
  const { less, sass, stylus, name } = options;
  const publicPath = `''`;

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
      entry: path.join(srcPath, 'index.tsx'),
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
      module: {
        rules: [
          ${row(cssRule({ useMiniCssExtractPlugin: false, publicPath }), true)}
          ${row(lessRule({ useMiniCssExtractPlugin: false, publicPath }), less)}
          ${row(sassRule({ useMiniCssExtractPlugin: false, publicPath }), sass)}
        ]
      },
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
        port: '9001',
        host: '0.0.0.0',
        overlay: true,
        historyApiFallback: true
      }
    });
  `;
  return tpl(str);
}
