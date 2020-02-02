const chalk = require('chalk')
const ora = require('ora')
const process = require('child_process');

const Task = {
  spinner: ora('开始更新 tiga-cli ...'),
  exec: async (script) => {
    try {
      await process.execSync(script)
      Task.spinner.succeed('[update]: tiga-cli 更新成功 \n')
    } catch (e) {
      if (e.status === 243) {
        console.log('\n')
        Task.spinner.warn(chalk.yellowBright('[update]: 权限不够, 请尝试使用管理员权限运行 \n'))
      }
    }
  },

  updateTiga: () => {
    Task.spinner.start()
    Task.exec('npm install -g tiga-cli')
  },
}

module.exports = Task
