#!/usr/bin/env node
const program = require('commander');
const pkg = require('./package.json');

// outputHelp
program.on('--help', function () {
  console.log('');
  console.log('Examples:');
  console.log('  [version]       tiga -v or --version');
  console.log('  [init]          tiga init test-file');
  console.log('  [update]        tiga update');
  console.log('');
});

program
  .version(pkg.version, '-v, --version', 'tiga version')

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
