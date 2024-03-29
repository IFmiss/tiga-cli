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

import { build, create, init, publish, serve, update } from './exec';

const program = new Command();

const CONFIG_FILE_PATH = `./${FILE_NAME_MAP.tiga.config}`;

function getTigaConfig(): TigaConfig {
  return require(resolveCwd(CONFIG_FILE_PATH));
}

/** outputHelp */
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

/** create a new project */
program
  .command('create <name>')
  .description('create a new project powered by tiga-cli')
  .option('-t --typescript', 'use typescript')
  .option('-g --git', 'use git')
  .action((name, options) => {
    updateNotifier(pkg);
    if (name) {
      create(name, {
        ...options,
        version: pkg.version
      });
    }
  });

/** init a new project */
program
  .command('init')
  .description('init a project by local config file')
  .action(() => {
    updateNotifier(pkg);
    init({
      version: pkg.version
    });
  });

/** start dev serve */
program
  .command('serve')
  .description('start webapck dev server')
  .option('-p --port <value>', 'start serve port')
  .option('-o --open', 'need to open the browser')
  .option('-c --config <value>', 'custom dev config path')
  .action((options) => {
    const config = getTigaConfig();
    serve(config, {
      ...options,
      version: pkg.version
    });
  });

/** build file */
program
  .command('build')
  .description('build project')
  .option('-c --config <value>', 'custom build config path')
  .option('--component', 'custom build config path')
  .action((options) => {
    const config = getTigaConfig();
    build(config, {
      ...options,
      version: pkg.version
    });
  });

/** update version */
program
  .command('upgrade')
  .description('update cli')
  .action(() => {
    update();
  });

/** publish to npm */
program
  .command('publish')
  .description('npm publish')
  .action(() => {
    publish();
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
