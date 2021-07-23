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
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const TerserPlugin = require('terser-webpack-plugin');
    const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    const { merge } = require('webpack-merge');
    const baseConfig = require('./webpack.base.config');

    const publicPath = ${publicPath};
    const distPath = path.resolve(__dirname, './../dist');
    const srcPath = path.resolve(__dirname, './../src');

    module.exports = merge(baseConfig, {
      mode: 'production',
      entry: './src/index.tsx',
      output: {
        publicPath,
        filename: 'js/[name].[contenthash:8].js',
        path: distPath
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          path: srcPath,
          template: path.join(srcPath, 'index.html'),
          title: ${name},
          // favicon: 'src/assets/favicon.ico',
          minify:{
            removeComments: true,
            collapseWhitespace: true
          },
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css'
        }),
        // ! 需要分析打包时，请打开注释
        // Remove annotation when need analyze package
        new BundleAnalyzerPlugin()
      ],
      module: {
        rules: [
          ${row(cssRule({ useMiniCssExtractPlugin: true, publicPath }), true)}
          ${row(lessRule({ useMiniCssExtractPlugin: true, publicPath }), less)}
          ${row(sassRule({ useMiniCssExtractPlugin: true, publicPath }), sass)}
        ]
      },
      optimization: {
        // deterministic option is useful for long term caching, but still results in smaller bundles compared to hashed
        moduleIds: 'deterministic',

        // The value 'single' instead creates a runtime file to be shared for all generated chunks.
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            polyfill: {
              chunks: 'all',
              test: /(core-js|regenerator-runtime)/,
              enforce: true,
              name: 'polyfill',
              priority: 110
            },
            vendors: {
              chunks: 'all',
              test: /(react|react-dom|react-router|react-router-dom)/,
              enforce: true,
              name: 'vendors',
              priority: 100
            },
            asyncs: {
              chunks: 'async',
              enforce: true,
              name: 'chunk.async',
              priority: 80
            }
          }
        },
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            }
          }),
          new CssMinimizerPlugin({
            parallel: true,
            minify: CssMinimizerPlugin.cssnanoMinify
          })
        ]
      },
      cache: {
        // 将缓存类型设置为文件系统,默认是memory
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, './../', '.temp_cache'),
        buildDependencies: {
          // 更改配置文件时，重新缓存
          config: [__filename]
        },
        compression: 'gzip'
      },
    });
  `;
  return tpl(str);
}