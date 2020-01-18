const program = require('commander')

program.usage('tiga  <command>')
        .version(require('./../package').version, '-v', 'output tiga version')
        .description('tiga-cli')

        .command('init [project-name]', 'create new project')
        .command('update', 'update version')
        .command('v', '版本查看')
        .parse(process.argv)
