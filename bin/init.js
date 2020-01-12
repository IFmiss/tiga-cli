const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob')

const download = require('./../utils/download')

program.usage('<project-name>')

// 根据输入，获取项目名称
let projectName = process.argv[2]

if (!projectName) {  // project-name 必填
  // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
  program.help() 
  return
}

const list = glob.sync('*')  // 遍历当前目录
let rootName = path.basename(process.cwd())
console.log(list)
console.log('process.argv', process.argv)
console.log('projectName', projectName)
if (list.length) {  // 如果当前目录不为空
  if (list.some(n => {
    const fileName = path.resolve(process.cwd(), n);
    const isDir = fs.statSync(fileName).isDirectory();
    return projectName === n && isDir
  })) {
    console.log(`项目${projectName}已经存在`);
    // remove(path.resolve(process.cwd(), projectName))
    return;
  }
} else if (rootName === projectName) {
    rootName = '.'
} else {
    rootName = projectName
}

select(projectName)

function select (name) {
  console.log('name', name)
  if (name !== '.') {
    fs.mkdirSync(name)
    console.log(`start init ${name}`)
    setTimeout(() => {
      download(name).then((target) => {
        return {
          name: name,
          root: name,
          downloadTemp: target
        }
      }).catch(err => {
        // 失败了用红色，增强提示
        console.log(err);
      })
    }, 300)
  }
  // 选择安装的模块
  console.log(`start init ${projectName}`)
  return
  download(name)
}

