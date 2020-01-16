const handlebars = require('handlebars')
const Metalsmith = require('metalsmith')
const fs = require('fs')
const path = require('path')

const Tpl = {
  initPackageJson: (projectInfo) => {
    
    try {
      console.log('to initPackageJson')
      const fileName = path.join(projectInfo.name, 'package.json')
      console.log(fileName)
      if (fs.existsSync(fileName)) {
        const content = fs.readFileSync(fileName).toString()
        const result = handlebars.compile(content)(projectInfo)
        console.log('result', result)
        // 重写覆盖
        fs.writeFileSync(fileName, result)
      }
    } catch (err) {
      console.log('err', err)
    }
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
            console.log('------')
            Tpl.initPackageJson(projectInfo)
          } else {
            files[fileName].contents = Buffer.from(handlebars.compile(fileText)(meta));
            // fs.writeFileSync(fileName, files[fileName].contents)
            // console.log(files[fileName].contents.toString())
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
