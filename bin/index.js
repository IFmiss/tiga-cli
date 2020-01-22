#!/usr/bin/env node
const program = require('commander');
const {
  init
} = require('./init');

program.on('--help', function(){
     console.log('');
     console.log('Examples:');
     console.log('  [version]   tiga -v or --version');
     console.log('  [init]      tiga init test-file');
     console.log('');
})

program
		 .version(require('./../package').version, '-v, --version', 'tiga version')

program
     .command('init [project]')
     .action(function (name) {
        if (name) {
					init(name)
        }
		 })

program
     .command('update', 'update tiga version')
     .parse(process.argv)
