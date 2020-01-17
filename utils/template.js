const handlebars = require('handlebars')
const Metalsmith = require('metalsmith')
const path = require('path')
const minimatch = require("minimatch")
const fs = require('fs')

const {
  existsSync,
  removeFileOrDirSync
} = require('./file')

// 注册 equal 动作
// handlebars.registerHelper('equal', function(v1, v2, options) {
//   if(v1 === v2) {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });

const Tpl = {
  initPackageJson: (projectInfo) => {
    const packageObj = {
      name: projectInfo.name,
      description: projectInfo.description,
      author: projectInfo.author
    }
    const packjsonTemp = path.join(projectInfo.downloadTemp, 'package.json')
    const content = fs.readFileSync(packjsonTemp).toString()
    const result = handlebars.compile(content)(packageObj)
    // 重写覆盖
    fs.writeFileSync(packjsonTemp, result)
  },

  /**
   * 文件初始化
   */
  initFile: (projectInfo) => {
    return new Promise((resolve, reject) => {
      const packjsonTemp = path.join(projectInfo.downloadTemp, 'package.json')
      const metalsmith = Metalsmith(process.cwd())
                      .metadata(projectInfo)
                      .clean(false)
                      .source(projectInfo.downloadTemp)
                      .destination(projectInfo.name);
      metalsmith.use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();
        Object.keys(files).forEach(fileName => {
          const fileText = files[fileName].contents.toString()
          if (fileName === 'package.json') {
            files[fileName].contents = handlebars.compile(fs.readFileSync(packjsonTemp).toString())(meta);
          } else {
            files[fileName].contents = Buffer.from(handlebars.compile(fileText)(meta));
          }
        })
        done();
      }).build(err => {
        removeFileOrDirSync(projectInfo.downloadTemp)
        err ? reject(err) : resolve(projectInfo)
      })
    })
  },

  removeIgnoreFile: (projectInfo) => {
    return new Promise((resolve, reject) => {
      const metalsmith = Metalsmith(process.cwd())
                      .metadata(projectInfo)
                      .clean(false)
                      .source(projectInfo.downloadTemp)
                      .destination(projectInfo.name);
      const ignoreFile = path.join(projectInfo.downloadTemp, 'templates.ignore')
      if (existsSync(ignoreFile)) {
        // 定义一个用于移除模板中被忽略文件的metalsmith插件
        metalsmith.use((files, metalsmith, done) => {
          const meta = metalsmith.metadata()
          // 先对ignore文件进行渲染，然后按行切割ignore文件的内容，拿到被忽略清单
          const ignores = handlebars.compile(fs.readFileSync(ignoreFile).toString())(meta)
                                    .split('\n').filter(item => !!item.length)
          Object.keys(files).forEach(fileName => {
            // 移除被忽略的文件
            console.log('fileName', fileName)
            ignores.forEach(async ignorePattern => {
              console.log('ignorePattern', ignorePattern)
              if (minimatch(fileName, ignorePattern)) {
                delete files[fileName]
                // console.log('delete -------------- ', path.join(projectInfo.downloadTemp, fileName))
                await removeFileOrDirSync(path.join(projectInfo.downloadTemp, fileName))
              }
            })
          })
          done()
        }).build(err => {
          // removeFileOrDirSync(projectInfo.name)
          err ? reject(err) : Tpl.initFile(projectInfo);
        })
      }
    })
  }
}

module.exports = Tpl

