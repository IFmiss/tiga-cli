#!/usr/bin/env node

import { RenderTemplateOptions } from '@tiga-cli/tpl-core';
import { Command } from 'commander';

import create from '../create';
import init from '../init';

const program = new Command();

program
  .command('init')
  .description('create a new project powered by tiga-cli')
  .option('--name <value>', 'project name')
  .option('-t --typescript', 'use typescript')
  .option('-g --git', 'use git')
  .option('--sass', 'scss/sass style')
  .option('--less', 'less style')
  .option('--stylus', 'stylus style')
  .option('--layout <type>', 'layout style', 'viewport')
  .option('--template <type>', 'template type')
  .option('--pkgtool <type>', 'pkgtool type')
  .option('--eslint', 'eslint check')
  .option('--prettier', 'prettier check')
  .option('--commitlint', 'commitlint check')
  .option('--stylelint', 'stylelint check')
  .option('--uuid <value>', 'uuid')
  .option('--runtimePath <value>', 'runtimePath')
  .option('--projectPath <value>', 'projectPath')
  .option('--date <value>', 'date')
  .option('--templatePkg <value>', 'templatePkg')
  .option('--overwrite')
  .option('--initFile <value>', 'init porject local config')
  .option('--version <value>', 'current tiga version')
  .action((args: RenderTemplateOptions) => {
    if (args.initFile) {
      return init(args);
    }
    create(args);
  });

program.parse(process.argv);
