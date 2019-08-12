/*
 * @Title: webpack development 配置
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 15:00:50
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-12 10:42:26
 */
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const clearConsole = require('react-dev-utils/clearConsole')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const openBrowser = require('react-dev-utils/openBrowser')
// 命令行输出美化
const compilerHooks = [
  {
    apply: compiler => {
      compiler.hooks.invalid.tap('invalid', function() {
        console.log('Compiling...')
      })
      compiler.hooks.done.tap('done', function(stats) {
        const rawMessages = stats.toJson({}, true)
        const messages = formatWebpackMessages(rawMessages)
        if (!messages.errors.length && !messages.warnings.length) {
          clearConsole()
        }
        if (messages.errors.length) {
          console.log('Failed to compile.')
          messages.errors.forEach(e => console.log(e))
          return
        }
        if (messages.warnings.length) {
          console.log('Compiled with warnings.')
          messages.warnings.forEach(w => console.log(w))
        }
      })
    }
  }
]

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    port: config.devPort,
    hot: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    after: function() {
      openBrowser(`http://localhost:${config.devPort}`)
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here: http://localhost:8889']
      }
    }),
    ...compilerHooks
  ]
}
