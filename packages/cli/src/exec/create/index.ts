import {
  DEFAULT_CREATE_OPTOPNS,
  inquirerQuestions,
  installTpl,
  RenderTemplateOptions,
  TEMPLATE_MAP,
  TypeCreateOptions
} from '@tiga-cli/tpl-core';
import { logInfo, rmFile, sleep } from '@tiga-cli/utils';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { v4 as uuid } from 'uuid';

const {
  questionTemplate,
  questionCss,
  questionLayout,
  questionTypescript,
  questionLint,
  questionpPkgTool,
  checkOverwrite
} = inquirerQuestions;

export default async function create(
  name: string,
  options: Omit<TypeCreateOptions, 'name'>
) {
  // check overwrite before create
  const overwrite = await checkOverwrite(name);

  const mergeOptions = {
    ...DEFAULT_CREATE_OPTOPNS,
    overwrite,
    name
  };

  // init config
  const config = await inquirer.prompt([
    questionTemplate,
    questionCss,
    questionLayout,
    ...(options?.typescript ? [] : [questionTypescript]),
    questionLint,
    questionpPkgTool
  ]);

  const renderTplOptions: RenderTemplateOptions = {
    ...mergeOptions,
    ...config,
    uuid: uuid(),
    version: options.version,
    runtimePath: process.cwd(),
    projectPath: `${process.cwd()}/${name}`,
    date: new Date().getTime().toString(),
    templatePkg: TEMPLATE_MAP[config?.template || 'react-spa'].pkg
  };

  // double confirm before create.
  if (overwrite) {
    const res = await checkOverwrite(name, true);
    if (res) {
      console.info();
      logInfo(
        `开始清除已存在的 ${chalk.underline(
          `${chalk.yellow(`${name}`)}`
        )} 项目 \n`
      );
      await sleep(300);
      rmFile(renderTplOptions.projectPath);
    }
  }

  // create template
  installTpl(renderTplOptions);
}
