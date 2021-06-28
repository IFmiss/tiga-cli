#!/usr/bin/env node

const pkg = require('./package.json');
import { Command } from 'commander';
import chalk from 'chalk';
import leven from 'leven';
import { init } from './exec';

const program = new Command();

// outputHelp
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`tiga <command> --help`)} for detailed usage of given command.`)
  console.log()
})


program
  .version(`tiga version: ${pkg.version}`)
  .usage('<command> [options]')

program
  .command('init <name>')
  .description('create a new project powered by tiga-cli')
  .option('-r, --recursive, --recursive <type>', 'Remove recursively')
  .option('-d --drink [drink]')
  .option('-g --git', 'use git')
  .action((name, options) => {
    if (name) {
      init(name, options)
    }
  })

program.on('command:*', ([cmd]) => {
  program.outputHelp()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}`))
  console.log()
  suggestCommands(cmd)
  console.log()
  process.exitCode = 1
})

program.parse(process.argv)

// if (!process.argv.slice(2).length) {
//   program.outputHelp()
// }

function suggestCommands (unknownCommand) {
  const availableCommands = program.commands.map(cmd => cmd.name())

  let suggestion

  availableCommands.forEach(cmd => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd
    }
  })

  if (suggestion) {
    console.log(`  ` + chalk.green(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}

