/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 16:38:12
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-12 18:22:20
 */
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not ie <= 8']
    }),
    require('cssnano')()
  ]
}
