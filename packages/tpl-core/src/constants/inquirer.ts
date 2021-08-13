import { isDirSync } from '@tiga-cli/utils';
import glob from 'glob';
import inquirer, { QuestionCollection } from 'inquirer';
import path from 'path';

import {
  CSS_MAP,
  LAYOUT_MAP,
  LINT_ENUM,
  TEMPLATE_MAP
} from './../constants/index';

// 是否覆盖
export const checkOverwrite = async (name, comfirmAgain: boolean = false) => {
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
          message: comfirmAgain
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

// 模版类型
export const questionTemplate: QuestionCollection = {
  name: 'template',
  message: '请选择项目类型',
  type: 'list',
  choices: () => {
    return Object.entries(TEMPLATE_MAP).map((item) => ({
      name: item[1].description,
      value: item[0]
    }));
  }
};

// css 样式类型
export const questionCss: QuestionCollection = {
  name: 'css',
  message: 'css 预处理模式 (都支持 css modules)',
  type: 'checkbox',
  default: ['less'],
  choices: () => {
    return Object.entries(CSS_MAP).map((item) => ({
      name: item[1],
      value: item[0]
    }));
  }
};

// layout 布局 px rem
export const questionLayout: QuestionCollection = {
  name: 'layout',
  message: 'layout 格式',
  type: 'list',
  choices: () => {
    return Object.entries(LAYOUT_MAP).map((item) => ({
      name: item[1],
      value: item[0]
    }));
  }
};

// use ts ?
export const questionTypescript: QuestionCollection = {
  name: 'typescript',
  message: '是否使用typescript',
  type: 'confirm'
};

// lint 校验
export const questionLint: QuestionCollection = {
  name: 'lint',
  message: 'lint 格式',
  type: 'checkbox',
  choices: LINT_ENUM,
  default: LINT_ENUM,
  when: () => {
    return true;
  }
};

// 选择包管理工具
export const questionpPkgTool: QuestionCollection = {
  name: 'pkgtool',
  message: 'pkgtool 格式',
  type: 'list',
  choices: ['pnpm', 'yarn', 'npm'],
  when: () => {
    return true;
  }
};
