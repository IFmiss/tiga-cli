const pkg: {
  version: string;
  name: string;
  [props: string]: unknown;
} = require('./../package.json');

import type { TigaConfig } from '@tiga-cli/tpl-core';
import { FILE_NAME_MAP, updateNotifier } from '@tiga-cli/tpl-core';
import { resolveCwd } from '@tiga-cli/utils';
import chalk from 'chalk';
import { Command } from 'commander';
import leven from 'leven';

import { build, create, init, serve, update } from '../exec';

const program = new Command();

const CONFIG_FILE_PATH = `./${FILE_NAME_MAP.tiga.config}`;

function getTigaConfig(): TigaConfig {
  return require(resolveCwd(CONFIG_FILE_PATH));
}

// outputHelp
program.on('--help', () => {
  console.info();
  console.info(
    `  Run ${chalk.cyan(
      `tiga <command> --help`
    )} for detailed usage of given command.`
  );
  console.info();
});

program.version(`tiga version: ${pkg.version}`).usage('<command> [options]');

program
  .command('create <name>')
  .description('create a new project powered by tiga-cli')
  .option('-t --typescript', 'use typescript')
  .option('-g --git', 'use git')
  .action((name, options) => {
    if (name) {
      create(name, options);
    }
    // updateNotifier(pkg);
  });

program
  .command('init')
  .description('init a project by local config file')
  .action(() => {
    init();
    // updateNotifier(pkg);
  });

program
  .command('serve')
  .description('start webapck dev server')
  .option('-p --port <port>', 'start serve port')
  .option('-o --open', 'need to open the browser')
  .option('--path', 'custom dev config path')
  .action((options) => {
    const config = getTigaConfig();
    serve(config, options);
  });

program
  .command('build')
  .description('build project')
  .option('--path', 'custom build config path')
  .action((options) => {
    const config = getTigaConfig();
    build(config, options);
  });

program
  .command('upgrade')
  .description('update cli')
  .action(() => {
    update();
  });

program.on('command:*', ([cmd]) => {
  program.outputHelp();
  console.info(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}`));
  console.info();
  suggestCommands(cmd);
  console.info();
  process.exitCode = 1;
});

program.parse(process.argv);

// if (!process.argv.slice(2).length) {
//   program.outputHelp()
// }

function suggestCommands(unknownCommand) {
  const availableCommands = program.commands.map((cmd) => cmd.name());

  let suggestion;

  availableCommands.forEach((cmd) => {
    const isBestMatch =
      leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand);
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd;
    }
  });

  if (suggestion) {
    console.info(
      `  ` + chalk.green(`Did you mean ${chalk.yellow(suggestion)}?`)
    );
  }
}
