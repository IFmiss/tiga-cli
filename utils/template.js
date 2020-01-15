const handlebars = require('handlebars')
const Metalsmith = require('metalsmith')
const fs = require('fs')

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
      const metalsmith = Metalsmith(process.cwd())
                      .metadata(projectInfo)
                      .clean(false)
                      .source(projectInfo.name)
                      .destination(projectInfo.name);

      metalsmith.use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();
        Object.keys(files).forEach(fileName => {
          const fileText = files[fileName].contents.toString()
          if (fileName === 'package.json') {
            Tpl.initPackageJson(projectInfo)
          } else {
            files[fileName].contents = Buffer.from(handlebars.compile(fileText)(meta));
            // fs.writeFileSync(fileName, files[fileName].contents)
            console.log(files[fileName].contents.toString())
          }
        })
        // package_temp_content = handlebars.compile(fs.readFileSync(packjsonTemp).toString())(meta);
        done();
      }).build(err => {
        // remove(src);
        err ? reject(err) : resolve(projectInfo);
      })
    })
  }
}

module.exports = Tpl
