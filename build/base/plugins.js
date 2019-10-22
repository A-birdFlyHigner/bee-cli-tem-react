/*
 * @Title: webpack base plugins
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 18:14:55
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-22 17:51:07
 */
const webpack = require('webpack')
const pathJoin = require('../webpack.utils').pathJoin
const YAML = require('yamljs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const APP_ENV = process.env.APP_ENV
const prefix = `global.${APP_ENV}.yml`
const globalSource = YAML.load(pathJoin('config', prefix))
const GOLBAL_CONST = YAML.load(pathJoin('config', 'gobal.const.yml'))
const DEFINE_GLOBAL = {
  APP_ENV,
  IS_DEVELOPMENT: APP_ENV === 'development',
  IS_TEST: APP_ENV === 'test',
  IS_PRODUCTION: APP_ENV === 'production'
}

globalSource && Object.assign(DEFINE_GLOBAL, globalSource)

const projectConfig = require(pathJoin('config', 'project.config.js'))
const GOLBAL_ALL = { ...DEFINE_GLOBAL, ...GOLBAL_CONST }
const GLOBAL_DEFINE = {}
for (let k in GOLBAL_ALL) {
  GLOBAL_DEFINE[k] = JSON.stringify(GOLBAL_ALL[k])
}
module.exports = [
  new MomentLocalesPlugin({
    localesToKeep: ['es-us', 'zh-cn']
  }),
  new webpack.EnvironmentPlugin(['APP_ENV']),
  new webpack.DefinePlugin({
    ...GLOBAL_DEFINE,
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new ProgressBarPlugin(),
  new HtmlWebpackPlugin({
    title: projectConfig.title,
    filename: 'index.html',
    favicon: pathJoin('public', 'favicon.ico'),
    template: pathJoin('public', 'index.html'),
    minify: {
      //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
      collapseBooleanAttributes: true,
      //是否移除注释 默认false
      removeCommentsFromCDATA: true,
      //从脚本和样式删除的注释 默认false
      removeEmptyAttributes: true
    }
  })
]
