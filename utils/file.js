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
  }
}

module.exports = fileUtils
