/*
 * @Title: webpack development 配置
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 15:00:50
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-14 13:45:23
 */
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const pathJoin = require('./webpack.utils.js').pathJoin
const YAML = require('yamljs')
const projectConfig = YAML.load(pathJoin('config', 'project.config.yml'))

module.exports = {
  devtool: 'eval',
  devServer: {
    port: projectConfig.devPort,
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
        messages: [`You application is running here: http://localhost:${projectConfig.devPort}`]
      }
    })
  ]
}
