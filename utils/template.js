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
    const fileName = `${packageObj.name}/package.json`
    const content = fs.readFileSync(fileName).toString()
    const result = handlebars.compile(content)(packageObj)
    // 重写覆盖
    fs.writeFileSync(fileName, result)
  },

  /**
   * 文件初始化
   */
  initFile: (projectInfo) => {
    return new Promise((resolve, reject) => {
      // 初始化 package.json
      Tpl.initPackageJson(projectInfo)

      const metalsmith = Metalsmith(process.cwd())
                      .metadata(projectInfo)
                      .clean(false)
                      .source(projectInfo.name)
                      .destination(projectInfo.name);

      metalsmith.use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();
        Object.keys(files).forEach(fileName => {
          const fileText = files[fileName].contents.toString()
          if (fileName !== 'package.json') {
            files[fileName].contents = Buffer.from(handlebars.compile(fileText)(meta));
            // fs.writeFileSync(fileName, files[fileName].contents)
          }
        })
        // package_temp_content = handlebars.compile(fs.readFileSync(packjsonTemp).toString())(meta);
        done();

        // 移除需要忽略的文档
        // await Tpl.removeIgnoreFile(projectInfo, metalsmith)
      }).build(err => {
        // remove(src);
        err ? reject(err) : resolve(projectInfo);
        // Tpl.removeIgnoreFile(projectInfo, metalsmith).build(err => {
        //   // remove(src);
        //   err ? reject(err) : resolve(projectInfo);
        // })
      })
    })
  },

  removeIgnoreFile: (projectInfo, metalsmith) => {
    const ignoreFile = path.join(projectInfo.name, 'templates.ignore')
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
          ignores.forEach(ignorePattern => {
            console.log('ignorePattern', ignorePattern)
            if (minimatch(fileName, ignorePattern)) {
              // delete files[fileName]
              console.log('---', fileName)
              removeFileOrDirSync(path.join(projectInfo.name, fileName))
            }
          })
        })
        done()
      })
    }
  }
}

module.exports = Tpl

