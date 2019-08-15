/*
 * @Title: webpack 基本配置
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-09 10:08:32
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-15 10:59:00
 */
const pathJoin = require('../webpack.utils').pathJoin
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stats: { children: false },
  entry: ['@babel/polyfill', pathJoin('src', 'app.tsx')],
  performance: { hints: false },
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
      '@images': pathJoin('src', 'images'),
      '@styles': pathJoin('src', 'styles'),
      '@stores': pathJoin('src', 'stores'),
      '@views': pathJoin('src', 'views'),
      '@routers': pathJoin('src', 'routers'),
      '@utils': pathJoin('src', 'utils')
    }
  },
  module: require('./module'),
  plugins: require('./plugins')
}
