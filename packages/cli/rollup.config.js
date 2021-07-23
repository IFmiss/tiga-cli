// import path from 'path';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript2 from 'rollup-plugin-typescript2';
import clear from 'rollup-plugin-clear';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
// import fs from 'fs';
// const packageName = process.env.npm_package_config_pkgName;

// console.info('packageName', packageName)

export default {
  input: `./src/bin/index.ts`,
  output: [
    {
      file: './build/index.js',
      format: 'cjs',
      banner: '#!/usr/bin/env node'
    }
  ],
  plugins: [
    clear({
      targets: ['dist']
    }),
    json(),
    typescript2({
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext'
        }
      }
    }),
    babel({
      exclude: /node_modules/,
      babelHelpers: 'runtime',
      skipPreflightCheck: true,
      configFile: path.resolve(__dirname, './../../babel.config.js')
    }),
    resolve({
      mainFields: 'main',
      modulesOnly: true
    }),
    commonjs({
      include: /node_modules/,
      sourceMap: true
    }),
    terser({
      output: {
        comments: false
      }
    })
  ]
};
