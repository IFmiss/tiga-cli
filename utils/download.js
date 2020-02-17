const download = require('download-git-repo')
const ora = require('ora')
const path = require('path')
const repoUrl = 'IFmiss/tiga-template-react#master'

const Download = {
  projectName: '',

  spinner: ora(),

  init: (target) => {
    Download.projectName = target
    return new Promise((resolve, reject) => {
      let mergeTarget = path.join(target || '.', '.download-temp')
  
      Download.spinner.start('正在下载项目模板...')
  
      download(repoUrl, mergeTarget, {}, function (err) {
        if (err) {
          Download.spinner.fail()
          reject(err)
          return
        }
        
        Download.spinner.text = ''
        Download.spinner.stopAndPersist()
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