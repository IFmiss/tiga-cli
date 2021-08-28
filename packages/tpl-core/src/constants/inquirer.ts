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
            ? '初始化环境前，请再次确认是否覆盖当前目录 (Before initializing the environment, please reconfirm whether to overwrite the current directory)'
            : '是否覆盖当前目录 (Whether to overwrite the current directory)'
        })
        .then(({ overwrite }) => {
          if (overwrite) {
            resolve(overwrite);
          } else {
            reject();
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
  message: '请选择项目类型 (Please select the project type)',
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
  message:
    'css 预处理模式 [都支持 css modules] (Css preprocessing mode [都支持 css modules])',
  type: 'checkbox',
  default: ['less'],
  choices: () => {
    return Object.entries(CSS_MAP).map((item) => ({
      name: item[1],
      value: item[0]
    }));
  }
};

// layout 布局 px viewport
export const questionLayout: QuestionCollection = {
  name: 'layout',
  message: '布局样式 (Layout style)',
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
  message: '是否使用typescript (Whether to use typescript)',
  type: 'confirm'
};

// lint 校验
export const questionLint: QuestionCollection = {
  name: 'lint',
  message: '选择校验的工具 (Choosing tools for inspection)',
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
  message: '选择包管理工具 (Choose a package management tool)',
  type: 'list',
  choices: ['pnpm', 'yarn', 'npm'],
  when: () => {
    return true;
  }
};
