/*
 * @Title: webpack development 配置
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 15:00:50
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-12 20:25:44
 */
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  // devServer: {
  //   port: config.devPort,
  //   hot: true,
  //   disableHostCheck: true,
  //   host: '0.0.0.0',
  //   after: function() {
  //     openBrowser(`http://localhost:${config.devPort}`)
  //   }
  // },
  devServer: {
    port: 8889,
    host: '0.0.0.0',
    publicPath: '/',
    quiet: true,
    disableHostCheck: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here: http://localhost:8889']
      }
    })
  ]
}
