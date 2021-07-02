const pkg = require('./../package.json');
import { Command } from 'commander';
import type { RenderTemplateOptions } from 'tiga-cli';
import chalk from 'chalk';
import leven from 'leven';

const program = new Command();

program
  .command('create <name>')
  .description('create a new project powered by tiga-cli')
  .option('-t --typescript', 'use typescript')
  .option('-g --git', 'use git')
  .action((name, options) => {
    if (name) {
      // create(name, options);
      console.info(name, options);
    }
  });

program.parse(process.argv);
