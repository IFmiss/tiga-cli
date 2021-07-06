#!/usr/bin/env

import { Command } from 'commander';
// import pkg from './../package.json';
const program = new Command();
import { RenderTemplateOptions } from 'tiga-cli';
import render from './../index';
program
  .command('init')
  .description('create a new project powered by tiga-cli')
  .option('--name <value>', 'project name')
  .option('-t --typescript', 'use typescript')
  .option('-g --git', 'use git')
  .option('--css <type>', 'css style', 'less')
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
  .action((args) => {
    console.info('args', args);
    render(args as RenderTemplateOptions);
  });

program.parse(process.argv);
