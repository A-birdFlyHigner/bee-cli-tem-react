/*
 * @Title: webpack 配置工具
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-09 14:23:09
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-09 16:24:38
 */
const path = require('path')

module.exports = {
  pathJoin(...folderName) {
    return path.join(__dirname, '../', ...folderName)
  }
}
