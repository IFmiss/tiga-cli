type InitOptions = {};

import inquirer, { QuestionCollection } from 'inquirer';
import glob from 'glob';
import ora from 'ora';
import { INIT_FILE, LAYOUT_MAP, TEMPLATE_MAP } from '../constants';
import { rmFileOrDir } from '../utils/file';

let mergeOptions = {
  name: 'tiga-test',
  git: false
};

export default async function create(name, options) {
  console.info('options', options);
  // create
  const overwrite = await checkOverwrite();

  // 第一次 check
  mergeOptions = Object.assign({}, mergeOptions, {
    overwrite
  });

  // 初始化配置
  const config = await inquirer.prompt([
    ...baseQuestions,
    ...layoutQuestions,
    ...(options?.typescript ? [] : typescriptQuestions),
    ...lintQuestions,
    ...pkgtoolQuestions
  ]);

  // 最终合并
  mergeOptions = Object.assign({}, mergeOptions, config);

  console.info(mergeOptions);

  // 开始构建前，二次确认是否覆盖
  if (overwrite) {
    await checkOverwrite(true);
  }
}

// 是否需要校验
const checkOverwrite = async (comfirm2nd: boolean = false) => {
  const list = glob.sync('*');
  return new Promise((resolve, reject) => {
    if (list.length) {
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
            console.info('cancel');
            process.exit(0);
          }
        });
    } else {
      return Promise.resolve(false);
    }
  });
};

const baseQuestions: Array<QuestionCollection> = [
  {
    name: 'template',
    message: '请选择项目类型',
    type: 'list',
    choices: Object.entries(TEMPLATE_MAP)[1],
    when: () => {
      return true;
    }
  },
  {
    name: 'css',
    message: 'css 预处理模式 (都支持 css modules)',
    type: 'list',
    choices: ['less', 'style-component'],
    when: (answer) => {
      console.info('answer', answer);
      return true;
    }
  }
];

const layoutQuestions: Array<QuestionCollection> = [
  {
    name: 'layout',
    message: 'layout 格式',
    type: 'list',
    choices: Object.entries(LAYOUT_MAP)[1],
    when: () => {
      return true;
    }
  }
];

const typescriptQuestions: Array<QuestionCollection> = [
  {
    name: 'typescript',
    message: '使用typescript？',
    type: 'confirm',
    when: () => {
      return true;
    }
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
