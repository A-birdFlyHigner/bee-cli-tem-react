/*
 * @Title: webpack development 配置
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 15:00:50
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-21 14:31:43
 */
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const pathJoin = require('./webpack.utils.js').pathJoin
const projectConfig = require(pathJoin('config', 'project.config.js'))
module.exports = {
  devtool: 'eval-source-map',
  devServer: projectConfig.devServer,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here: http://localhost:${projectConfig.devServer.port}/#/home`]
      }
    })
  ]
}
