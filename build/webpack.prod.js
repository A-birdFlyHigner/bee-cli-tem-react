/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 15:00:58
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-12 14:32:19
 */
const path = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackConfig = require('./webpack.base')

module.exports = merge(webpackConfig, {
  output: {
    filename: 'script/[name].[hash:7].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].[hash:7].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:5].[ext]',
              limit: 1024, // size <= 1kib
              outputPath: '/image',
              publicPath: '/image'
            }
          }
        ]
      }
    ]
  }
})
