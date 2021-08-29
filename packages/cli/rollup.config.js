// import path from 'path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import clear from 'rollup-plugin-clear';
import { terser } from 'rollup-plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';

export default {
  input: `./src/bin/index.ts`,
  onwarn: function (warning) {
    // Skip certain warnings
    // should intercept ... but doesn't in some rollup versions
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    // console.warn everything else
    console.warn(warning.message);
  },
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
      preferBuiltins: true,
      mainFields: ['browser']
      // modulesOnly: true
    }),
    commonjs({
      include: /node_modules/
    }),
    terser({
      output: {
        comments: false
      }
    })
  ]
};
