const download = require('download-git-repo')
const ora = require('ora')
const path = require('path')
const repoUrl = 'IFmiss/tiga-template-react#git_commit_msg_02_13'

const Download = {
  projectName: '',

  spinner: ora(`正在下载项目模板... \n`),

  init: (target) => {
    Download.projectName = target
    return new Promise((resolve, reject) => {
      let mergeTarget = path.join(target || '.', '.download-temp')
  
      Download.spinner.start()
  
      download(repoUrl, mergeTarget, {
        clone: true
      }, function (err) {
        if (err) {
          Download.spinner.fail()
          reject(err)
          return
        }
  
        resolve(mergeTarget)
      })
    }, (err) => {
      Download.spinner.fail()
      reject(err)
    })
  },

  finish: () => {
    Download.spinner.succeed(`模版下载完成: \n 
    cd ${Download.projectName} \n 
    npm install || yarn \n
    npm run dev || yarn dev  \n`)
  }
}

module.exports = Download