export default `const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const through2 = require('through2');
const babel = require('gulp-babel');

const paths = {
  dest: {
    cjs: 'dist/cjs',
    esm: 'dist/esm',
    dist: 'dist'
  },
  styles: [
    'src/components/**/*.{css,less,scss,sass}',
    '!src/components/**/{demo,__demo__,test,__test__,stories,__stories__}/*.{css,less,scss,sass}'
  ],
  scripts: [
    'src/components/**/*.{ts,tsx,js,jsx}',
    '!src/components/**/{demo,__demo__,test,__test__,stories,__stories__}/*.{ts,tsx,js,jsx}'
  ]
};

/**
 * 拷贝less文件
 */
function copyLess() {
  return gulp
    .src(paths.styles)
    .pipe(gulp.dest(paths.dest.cjs))
    .pipe(gulp.dest(paths.dest.esm));
}

/**
 * 生成css文件
 */
function less2css() {
  return gulp
    .src(paths.styles)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(
      cssnano({
        zindex: false,
        reduceIdents: false
      })
    )
    .pipe(gulp.dest(paths.dest.cjs))
    .pipe(gulp.dest(paths.dest.esm));
}

/**
 * 编译脚本文件
 * @param {*} babelEnv babel环境变量
 * @param {*} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
  const { scripts } = paths;
  // set env to change babel config
  process.env.BABEL_ENV = babelEnv;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        // 找到目标
        if (file.path.match(/(\\/|\\\\)style(\\/|\\\\)index\\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 文件内容处理
          file.path = file.path.replace(/index\\.js/, 'css.js'); // 文件重命名
          this.push(file); // 新增该文件
          next();
        } else {
          next();
        }
      })
    )
    .pipe(gulp.dest(destDir));
}

/**
 * 编译cjs
 */
function compileCJS() {
  const { dest } = paths;
  return compileScripts('cjs', dest.cjs);
}

/**
 * 编译esm
 */
function compileESM() {
  const { dest } = paths;
  return compileScripts('esm', dest.esm);
}

/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
function cssInjection(content) {
  return content
    .replace(/\\/style\\/?'/g, "/style/css'")
    .replace(/\\/style\\/?"/g, '/style/css"')
    .replace(/\\.less/g, '.css');
}

const buildScripts = gulp.series(compileCJS, compileESM);

const build = gulp.parallel(buildScripts, copyLess, less2css);

exports.build = build;

exports.default = build;

`;
