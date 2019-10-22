/*
 * @Title: webpack 基本配置
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-09 10:08:32
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-18 19:49:18
 */
const pathJoin = require('../webpack.utils').pathJoin
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
module.exports = {
  // stats: { children: false },
  stats: 'minimal',
  // entry: pathJoin('src', 'app.tsx'),
  entry: ['@babel/polyfill', pathJoin('src', 'app.tsx')],
  // performance: { hints: false },
  resolve: {
    mainFiles: ['index'],
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
