const download = require('download-git-repo')
const ora = require('ora')
const path = require('path')
const repoUrl = 'IFmiss/d-audio#master'

module.exports = function (target) {
  return new Promise((resolve, reject) => {
    let mergeTarget = path.join(target || '.', '.download-temp')
    console.log(mergeTarget)
    const spinner = ora(`正在下载项目模板，源地址：${repoUrl}`)

    spinner.start()

    download(repoUrl, mergeTarget, {
      clone: true
    }, function (err) {
      console.log('result')
      if (err) {
        spinner.fail()
        reject(err)
        return
      }

      spinner.succeed()
      resolve(mergeTarget)
    })
  }, (err) => {
    console.log('err', err)
    reject(err)
  })
}
