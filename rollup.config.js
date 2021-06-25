// import path from 'path';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript2 from 'rollup-plugin-typescript2';
import clear from 'rollup-plugin-clear';
import { terser } from 'rollup-plugin-terser';
// import fs from 'fs';
// const packageName = process.env.npm_package_config_pkgName;

// console.info('packageName', packageName)

export default {
  input: `index.ts`,
  output: [{
    file: `dist/cjs/index.js`,
    format: 'cjs',
  }, {
    file: `dist/esm/index.js`,
    format: 'esm',
    exports: 'named',
  }, {
    file: `dist/umd/index.js`,
    format: 'umd',
    name: 'index.js',
  }],
  plugins: [
    clear({
      targets: ['dist']
    }),
    json(),
    typescript2(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    }),
    resolve({
      mainFields: 'main',
      modulesOnly: true
    }),
    commonjs({
      include: 'node_modules/**',
      sourceMap: true,
      namedExports: {
        react: [
          'useState',
          'useEffect',
          'useMemo',
          'useCallBack',
          'useRef'
        ],
        'react-router-dom': [
          'useLocation'
        ]
      }
    }),
    terser({
      output: {
        comments: false
      }
    })
  ]
};
