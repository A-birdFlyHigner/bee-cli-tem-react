/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 18:13:19
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-13 10:15:58
 */
const pathJoin = require('../webpack.utils').pathJoin
const IS_DEVELOPMENT = process.env.APP_ENV === 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const css_loader = [IS_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']

const styleRules = [
  {
    enforce: 'pre',
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      ...css_loader,
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [pathJoin('src', 'style', 'global.mixins.scss'), pathJoin('src', 'styles', 'global.variable.scss')]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [require('bourbon').includePaths]
        }
      }
    ]
  }
]

const scriptRules = [
  {
    test: /\.(j|t)sx?$/,
    include: [pathJoin('src')],
    use: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['@babel/preset-env', { targets: { browsers: ['chrome >= 47'] }, useBuiltIns: 'usage', corejs: 3 }],
            '@babel/preset-typescript',
            '@babel/preset-react'
          ],
          plugins: [
            ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import'
            // 'react-hot-loader/babel'
          ]
        }
      },
      'ts-loader'
    ].filter(Boolean)
  }
]

module.exports = {
  rules: [...styleRules, ...scriptRules]
}
