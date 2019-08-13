/*
 * @Title: webpack 基本配置
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-09 10:08:32
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-12 20:28:21
 */
const pathJoin = require('../webpack.utils').pathJoin
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stats: { children: false },
  entry: ['@babel/polyfill', pathJoin('src', 'app.tsx')],
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: pathJoin('tsconfig.json'),
        extensions: ['.jsx', '.js', '.ts', '.tsx']
      })
    ],
    alias: {
      '@': pathJoin('src'),
      '@api': pathJoin('src', 'api'),
      '@components': pathJoin('src', 'components'),
      '@images': pathJoin('src', 'images')
    }
  },
  module: require('./module'),
  plugins: require('./plugins')
}
