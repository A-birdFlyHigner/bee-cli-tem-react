/*
 * @Title: webpack启动入口
 * @Descripttion: 根据APP_ENV 对不同环境配置merge
 * @Author: 太一
 * @Date: 2019-08-09 10:53:01
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-12 10:33:48
 */
const merge = require('webpack-merge')

const Utils = require('./build/webpack.utils')

const WEBPACK_BASE = require('./build/base')

const APP_ENV = process.env.APP_ENV

const ENV_CONFIG = {
  production: 'webpack.prod',
  development: 'webpack.dev',
  test: 'webpack.prod'
}

module.exports = merge(WEBPACK_BASE, {
  mode: process.env.NODE_ENV,
  ...require(Utils.pathJoin('build', ENV_CONFIG[APP_ENV]))
})
