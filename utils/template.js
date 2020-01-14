const handlebars = require('handlebars')
const fs = require('fs')

module.exports = {
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
  }
}
