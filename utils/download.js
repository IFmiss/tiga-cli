const download = require('download-git-repo')
const ora = require('ora')
const path = require('path')
const repoUrl = 'IFmiss/logger#master'

module.exports = function (target) {
  return new Promise((resolve, reject) => {
    let mergeTarget = path.join(target || 'tiga_project')
    const spinner = ora(`正在下载项目模板...`)

    spinner.start()

    download(repoUrl, mergeTarget, {
      clone: true
    }, function (err) {
      if (err) {
        spinner.fail()
        reject(err)
        return
      }

      spinner.succeed(`模版下载完成: \n cd ${mergeTarget} \n npm install \n`)
      resolve(mergeTarget)
    })
  }, (err) => {
    reject(err)
  })
}
