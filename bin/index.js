const program = require('commander')

program.version(require('./../package').version)
        .usage('[Tiga] [项目名称]')
        .command('init', '创建新项目')
        .parse(process.argv)
