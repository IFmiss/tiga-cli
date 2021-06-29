type InitOptions = {};

import inquirer, { QuestionCollection } from 'inquirer';
import glob from 'glob';
import ora from 'ora';
import process from 'process';
import { INIT_FILE, TEMPLATE_MAP } from '../constants';
import { rmFileOrDir } from '../utils/file';

export default async function create(name, options) {
  // create
  const needOverWrite = await checkOverwrite();

  if (needOverWrite) {
    // 清楚当前目录
    const spinner = ora();
    spinner.start(`删除文件  \n`);
    try {
      await rmFileOrDir('');
    } catch (e) {
      console.info(e);
    }
    spinner.clear();
  }
  // 初始化
}

const checkOverwrite = async () => {
  const list = glob.sync('*');
  if (list.length) {
    await inquirer
      .prompt({
        name: 'overwrite',
        type: 'confirm',
        message: '是否覆盖当前目录'
      })
      .then(({ overwrite }) => {
        if (overwrite) {
          return Promise.resolve(true);
        } else {
          console.info('cancel');
          process.exit(0);
        }
      });
  } else {
    return Promise.resolve(false);
  }
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
  }
];
