/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 18:13:19
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-12 10:58:11
 */
const pathJoin = require('../webpack.utils').pathJoin
const styleRules = [
  {
    enforce: 'pre',
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [pathJoin('src', 'style', 'global.mixins.scss'), pathJoin('src', 'styles', 'global.variable.scss')]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [require('bourbon').includePaths]
        }
      }
    ]
  }
]

const scriptRules = []

module.exports = {
  rules: [...styleRules, ...scriptRules]
}
