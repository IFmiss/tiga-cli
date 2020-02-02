const handlebars = require('handlebars')
const Metalsmith = require('metalsmith')
const path = require('path')
const minimatch = require("minimatch")
const fs = require('fs-extra')
const {
  init: HandlebarsRegister
} = require('./handlebars.register')

const {
  existsSync,
  removeFileOrDirSync,
  isImage
} = require('./file')

/**
 * 注册 Handlebars 动作
 */
HandlebarsRegister()

const Tpl = {
  /**
   * 初始化 package.json 文件
   */
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
          // 是否是图片
          if (isImage(fileName)) {
            fs.copyFileSync(path.join(projectInfo.downloadTemp, fileName),
                            path.join(projectInfo.name, fileName))
          } else {
            if (fileName === 'package.json') {
              files[fileName].contents = handlebars.compile(fs.readFileSync(packjsonTemp).toString())(meta);
            } else {
              files[fileName].contents = Buffer.from(handlebars.compile(fileText)(meta));
            }
          }
        })
        done();
      }).build(async err => {
        await removeFileOrDirSync(projectInfo.downloadTemp)
        await Tpl.removeIgnoreTemplate(projectInfo)
        err ? reject(err) : resolve(projectInfo)
      })
    })
  },

  /**
   * 根据 templates.ignore 删除不需要的文件
   */
  initIgnoreFile: async (projectInfo) => {
    await Tpl.moveFileDirSync(projectInfo)
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
            ignores.forEach(async ignorePattern => {
              if (minimatch(fileName, ignorePattern)) {
                delete files[fileName]
                await removeFileOrDirSync(path.join(projectInfo.downloadTemp, fileName))
              }
            })
          })
          done()
        }).build(err => {
          err ? reject(err) : resolve(projectInfo)
        })
      }
    })
  },

  /**
   * 删除 templates.ignore
   */
  removeIgnoreTemplate: async (projectInfo) => {
    const ignoreFile = path.join(projectInfo.name, 'templates.ignore')
    await removeFileOrDirSync(ignoreFile)
  },

  /**
   * 针对 状态 管理，mobx，redux 拷贝至store目录下
   */
  moveFileDirSync: async (projectInfo) => {
    if (projectInfo.useStore === 'none') {
      return Promise.resolve(projectInfo)
    }
    return new Promise((resolve, reject) => {
      const storeDir = path.join(projectInfo.downloadTemp, 'src/store')
      const copyedDir = path.join(projectInfo.downloadTemp, 'src/store', projectInfo.useStore)
      fs.copy(copyedDir, storeDir, err => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        resolve(projectInfo)
      })
    })
  }
}

module.exports = Tpl

