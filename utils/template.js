const handlebars = require('handlebars')
const Metalsmith = require('metalsmith')
const path = require('path')
const minimatch = require("minimatch")
const fs = require('fs-extra')
const {
  exec,
  exit,
  cd
} = require('shelljs')
const {
  init: HandlebarsRegister
} = require('./handlebars.register')

const {
  existsSync,
  removeFileOrDirSync,
  isImage,
  copy
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
   * git初始化文件的移动
   */
  moveFileDirSync: async (projectInfo) => {
    let moveTask = []
    if (projectInfo.useStore === 'none') {
      return Promise.resolve(projectInfo)
    }
    moveTask.push(copy(
      path.join(projectInfo.downloadTemp, 'src/store', projectInfo.useStore),
      path.join(projectInfo.downloadTemp, 'src/store')
    ))
    
    // if (projectInfo.useGitHook) {
    //   //  创建一个 .git 空文件夹，再复制 .git文件夹内容
    //   fs.mkdirSync('.git')
    //   moveTask.push(copy(
    //     path.join(projectInfo.downloadTemp, 'git'),
    //     path.join(projectInfo.downloadTemp, '.git')
    //   ))
    // }
    return Promise.all(moveTask)
  },

  /**
   * 初始化 git hook （实际上是初始化 git 环境）
   */
  initGitHook: (path) => {
    console.log('')
    return new Promise((resolve, reject) => {
      if (cd(path).code !== 0) {
        console.log(chalk.red(`无法进入[${path}]目录执行git初始化 \n`))
        exit(1)
        reject()
      }
  
      if (exec('git init').code !== 0) {
        console.log(chalk.red(`git init 初始化失败 \n`))
        exit(1)
        reject()
      }

      console.log('')
      console.log('git init 初始化成功')
      console.log('')
      resolve()
    })
  }
}

module.exports = Tpl

