const fs = require('fs')
const path = require('path')
const rm = require('rimraf').sync

const fileUtils = {
  /**
   * 判断文件是否存在
   * @param { String } fileName 
   */
  existsSync (fileName) {
    const exist = fs.existsSync(fileName)
    if (!exist) {
      console.log(`file: ${fileName}不存在 !`)
      return exist
    }
    return exist
  },

  /**
   * 判断是否是图片
   * @param { String } fileName 
   */
  isImage (fileName) {
    const types = ['.gif', 
                   '.jpg',
                   '.png',
                   '.ico']
    console.log('path.extname(fileName) ===> ', path.extname(fileName))
    return types.includes(path.extname(fileName).toLocaleLowerCase())
  },

  /**
   * 判断文件是否是文件夹
   * @param { String } fileName 
   */
  isDirSync (fileName) {
    const stat = fs.statSync(fileName)
    return stat.isDirectory()
  },
  
  /**
   * 删除文件夹或者文件的操作
   * @param { String } fileName 
   */
   removeFileOrDirSync (fileName) {
    rm(fileName)
    // try {
    //   console.log('try delete file: ' + fileName)
    //   // 是否存在
    //   if (!fileUtils.existsSync(fileName)) {
    //     return false
    //   }
    //   // 是否是文件夹
    //   const isDir = fileUtils.isDirSync(fileName)
    //   if (!isDir) {
    //     console.log('fileName', fileName)
    //     // 删除文件
    //     fs.unlinkSync(fileName)
    //     return
    //   }

    //   // 递归
    //   const files = fs.readdirSync(fileName)
    //   if (files.length > 0) {
    //     files.forEach(item => {
    //       fileUtils.removeFileOrDirSync(path.join(fileName, item))
    //     })
    //   }
    //   fs.rmdirSync(fileName)
    // } catch (err) {
    //   rm(fileName)
    //   throw err
    // }
  }
}

module.exports = fileUtils
