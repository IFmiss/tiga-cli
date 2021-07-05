type InitOptions = {};

import inquirer, { QuestionCollection } from 'inquirer';
import glob from 'glob';
import {
  CSS_MAP,
  DEFAULT_CREATE_OPTOPNS,
  RenderTemplateOptions,
  TypeCreateOptions
} from './../constants/index';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { LAYOUT_MAP, TEMPLATE_MAP } from '../constants';
import { isDirSync, mkdir, rmFileOrDir } from '../utils/file';
import {
  logWarn,
  logInfo,
  logError,
  logSuccess,
  installDependencies,
  installTpl
} from '@tiga-cli/utils';

export default async function create(
  name: string,
  options: Omit<TypeCreateOptions, 'name'>
) {
  // check overwrite before create
  const overwrite = await checkOverwrite(name);

  const mergeOptions = Object.assign({}, DEFAULT_CREATE_OPTOPNS, {
    overwrite,
    name
  });

  // init config
  const config = await inquirer.prompt([
    ...baseQuestions,
    ...layoutQuestions,
    ...(options?.typescript ? [] : typescriptQuestions),
    ...lintQuestions,
    ...pkgtoolQuestions
  ]);

  const renderTplOptions: RenderTemplateOptions = Object.assign(
    {},
    mergeOptions,
    {
      ...config,
      uuid: uuid(),
      runtimePath: process.cwd(),
      projectPath: `${process.cwd()}/${name}`,
      date: new Date().getTime().toString(),
      templatePkg: TEMPLATE_MAP[config?.template || 'react-spa'].pkg
    }
  );

  // double confirm before create
  if (overwrite) {
    const res = await checkOverwrite(name, true);
    if (res) {
      logInfo(`开始清除已存在的${name}项目`);
      rmFileOrDir(renderTplOptions.projectPath);
    }
  }

  // rebuild dir
  mkdir(renderTplOptions.projectPath);

  // create template
  // const module = await import(renderTplOptions.templatePkg);
  // module.default(renderTplOptions);
  console.info('renderTplOptions', renderTplOptions);
  installTpl(renderTplOptions);

  // run install
  // await installDependencies(renderTplOptions);
}

// check need overwrite
const checkOverwrite = async (name, comfirm2nd: boolean = false) => {
  const list = glob.sync('*');
  return new Promise((resolve, reject) => {
    if (
      // check dir name exist
      list.some((n) => {
        const isDir = isDirSync(path.resolve(process.cwd(), n));
        return name === n && isDir;
      })
    ) {
      inquirer
        .prompt({
          name: 'overwrite',
          type: 'confirm',
          message: comfirm2nd
            ? '初始化环境前，请再次确认是否覆盖当前目录'
            : '是否覆盖当前目录'
        })
        .then(({ overwrite }) => {
          if (overwrite) {
            resolve(overwrite);
          } else {
            reject('cancel');
            process.exit(0);
          }
        });
    } else {
      resolve(false);
    }
  });
};

const baseQuestions: Array<QuestionCollection> = [
  {
    name: 'template',
    message: '请选择项目类型',
    type: 'list',
    choices: () => {
      return Object.entries(TEMPLATE_MAP).map((item) => ({
        name: item[1].description,
        value: item[0]
      }));
    }
  },
  {
    name: 'css',
    message: 'css 预处理模式 (都支持 css modules)',
    type: 'list',
    choices: () => {
      return Object.entries(CSS_MAP).map((item) => ({
        name: item[1],
        value: item[0]
      }));
    }
  }
];

const layoutQuestions: Array<QuestionCollection> = [
  {
    name: 'layout',
    message: 'layout 格式',
    type: 'list',
    choices: () => {
      return Object.entries(LAYOUT_MAP).map((item) => ({
        name: item[1],
        value: item[0]
      }));
    }
  }
];

const typescriptQuestions: Array<QuestionCollection> = [
  {
    name: 'typescript',
    message: '使用typescript？',
    type: 'confirm'
  }
];

const lintQuestions: Array<QuestionCollection> = [
  {
    name: 'lint',
    message: 'lint 格式',
    type: 'checkbox',
    choices: ['eslint', 'prettier', 'commitlint', 'stylelint'],
    default: ['eslint', 'prettier', 'commitlint', 'stylelint'],
    when: () => {
      return true;
    }
  }
];

const pkgtoolQuestions: Array<QuestionCollection> = [
  {
    name: 'pkgtool',
    message: 'pkgtool 格式',
    type: 'list',
    choices: ['pnpm', 'yarn', 'npm'],
    when: () => {
      return true;
    }
  }
];
