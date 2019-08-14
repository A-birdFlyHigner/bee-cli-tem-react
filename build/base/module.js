/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 18:13:19
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-14 17:55:17
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
  },
  {
    test: /\.css$/,
    use: [...css_loader]
  }
]

const scriptRules = [
  {
    test: /\.(j|t)sx?$/,
    include: [pathJoin('src')],
    use: ['babel-loader', 'awesome-typescript-loader']
  }
]

const imageRules = [
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
      'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
    ]
  }
]
module.exports = {
  rules: [...styleRules, ...scriptRules, ...imageRules]
}
