const {
  init
} = require('./init')
const program = require('commander')

program.on('--help', function(){
     console.log('')
     console.log('Examples:');
     console.log('  [version]   tiga -v or --version');
     console.log('  [init]      tiga init test-file');
     console.log('')
})

program
     .command('init [project]')
     .action(function (name) {
        if (name) {
					init(name)
        }
		 })

program
     .command('update', 'update tiga version')

program
     .version(require('./../package').version, '-v, --version', 'tiga version')
     .parse(process.argv)
