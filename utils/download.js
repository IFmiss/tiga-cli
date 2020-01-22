const download = require('download-git-repo')
const ora = require('ora')
const path = require('path')
const repoUrl = 'IFmiss/tiga-template-react#master'

const Download = {
  projectName: '',

  spinner: ora(`正在下载项目模板...`),

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