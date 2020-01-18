const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const ora = require('ora')
const inquirer = require('inquirer')
inquirer.registerPrompt('selectLine', require('inquirer-select-line'));
const download = require('./../utils/download')
const chalk = require('chalk')

const {
  isDirSync,
  removeFileOrDirSync
} = require('./../utils/file')

const {
  sleep
} = require('./../utils/utils')

const {
  initPackageJson,
  initFile,
  removeIgnoreFile
} = require('./../utils/template')


program.usage('<project-name>')

// 根据输入，获取项目名称
console.log('process.argv', process.argv)

const projectName = process.argv[2]
let rootName = path.basename(process.cwd())

if (!projectName) {  // project-name 必填
  // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
  program.help()
  return
}

const list = glob.sync('*')  // 遍历当前目录

// 如果当前目录不为空
if (list.length) {
  // 判断文件是否存在
  if (list.some(n => {
    const fileName = path.resolve(process.cwd(), n);
    const isDir = isDirSync(fileName);
    return projectName === n && isDir
  })) {
    inquirer
      .prompt([
        {
          name: 'ok',
          type: 'confirm',
          message: `项目名称: ${projectName} 已经存在, 确认覆盖此文件夹?`,
        }
      ]).then(answers => {
        if (answers.ok) {
          inputBaseInfo(projectName, true)
          return
        }
      }).catch(err => {
        throw err
      })
    return
  }
  inputBaseInfo(projectName)
} else {
    // rootName = projectName
    inputBaseInfo(projectName)
}

// 安装之前需要下载的信息
async function inputBaseInfo(name, cover) {
  let projectInfo = {
    name,
    rootName
  }
  // 输入描述，和开发人
  inquirer.prompt([
    {
      name: 'description',
      message: '请输入项目描述'
    },
    {
      name: 'author',
      message: '请输入作者名称'
    }
  ]).then(({ description, author }) => {
    projectInfo = Object.assign({}, projectInfo, {
      description,
      author
    })
    // 安装什么环境

    inquirer.prompt([
      {
        name: 'useRouter',
        type: 'confirm',
        message: `是否使用 React-Router ?`,
      }, {
        name: 'useTypeScript',
        type: 'confirm',
        message: `是否使用 TypeScript ?`,
      }, {
        type: 'list',
        message: '是否有数据状态管理的需求 ?',
        name: 'useStore',
        choices: ['redux', 'mobx', 'none'],
      }, {
        type: 'list',
        message: '选择一个css 预处理 ?',
        name: 'useStyle',
        choices: ['less', 'scss', 'none'],
      }
    ]).then(async ({ useRouter, useTypeScript, useStore, useStyle }) => {
      projectInfo = Object.assign({}, projectInfo, {
        useRouter,
        useTypeScript,
        useStore,
        useStyle
      })
      // initPackageJson(projectInfo)
      // return
      // console.log('projectInfo', projectInfo)
      console.log()
      console.log('====================')
      console.log('====================')
      console.log()

      if (cover) {
        Object.assign(projectInfo, {
          coverDir: true
        })
        const spinner = ora()
        spinner.start(`删除目录下已存在的 [${projectInfo.name}] 文件夹...  \n`)
        // 为了防止 要覆盖的文件内容少导致无法渲染 start文案 而直接显示 succeed 文案结果的问题
        await sleep(500)

        await removeFileOrDirSync(projectName)
        spinner.succeed(`[${projectInfo.name}] 原文件清除成功 \n`)
      }
      await start(projectInfo)
    })
  })
}

async function start (projectInfo) {
  const { name } = projectInfo
  if (name !== '.') {
    // 创建文件夹
    fs.mkdirSync(name)
    await sleep(300)
    try {
      const target = await download(name)
      // const obj = {
      //   name: name,
      //   root: rootName,
      //   downloadTemp: target
      // }
      console.log(projectInfo)
      // initPackageJson(projectInfo)
      const newProjectInfo = Object.assign({}, projectInfo, {
        downloadTemp: target
      })
      removeIgnoreFile(newProjectInfo)
    } catch (e) {
      // 失败了用红色，增强提示
      console.log(e);
      console.log(chalk.red(`创建失败：${e.message}`))
    }
    return
  }
  program.help()
}

