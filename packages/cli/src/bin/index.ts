const pkg = require('./../package.json');
import { Command } from 'commander';
import chalk from 'chalk';
import leven from 'leven';
import { create } from '../exec';

const program = new Command();

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
