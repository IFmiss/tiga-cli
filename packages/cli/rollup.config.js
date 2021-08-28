// import path from 'path';
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import path from "path";
import clear from "rollup-plugin-clear";
import { terser } from "rollup-plugin-terser";
import typescript2 from "rollup-plugin-typescript2";

export default {
  input: `./src/bin/index.ts`,
  output: [
    {
      file: "./build/index.js",
      format: "cjs",
      banner: "#!/usr/bin/env node"
    }
  ],
  plugins: [
    clear({
      targets: ["dist"]
    }),
    json(),
    typescript2({
      tsconfigOverride: {
        compilerOptions: {
          module: "esnext"
        }
      }
    }),
    babel({
      exclude: /node_modules/,
      babelHelpers: "runtime",
      skipPreflightCheck: true,
      configFile: path.resolve(__dirname, "./../../babel.config.js")
    }),
    resolve({
      mainFields: "main",
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
