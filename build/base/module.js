/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 18:13:19
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-17 19:52:42
 */
const pathJoin = require('../webpack.utils').pathJoin
const IS_DEVELOPMENT = process.env.APP_ENV === 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const YAML = require('yamljs')
const theme = YAML.load(pathJoin('config', 'theme.yml'))

const cssLoader = modules => ({
  loader: 'css-loader',
  options: {
    modules: modules
      ? {
          mode: 'local',
          localIdentName: '[local]--[hash:base64:8]'
        }
      : false
  }
})

const baseLoaders = modules => [
  IS_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
  // 'style-loader',
  cssLoader(modules),
  'postcss-loader'
]

const styleRules = [
  {
    enforce: 'pre',
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      ...baseLoaders(true),
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [pathJoin('src', 'style', 'global.mixins.scss'), pathJoin('src', 'styles', 'global.variable.scss')]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [require('bourbon').includePaths],
          sourceMap: IS_DEVELOPMENT
        }
      }
    ]
  },
  {
    test: /\.css$/,
    include: /node_modules/,
    use: [...baseLoaders(false)]
  },
  {
    test: /\.less$/,
    use: [
      ...baseLoaders(false),
      {
        loader: 'less-loader',
        options: {
          modifyVars: theme,
          javascriptEnabled: true,
          sourceMap: IS_DEVELOPMENT
        }
      }
    ]
  }
]

const scriptRules = [
  {
    test: /\.(j|t)sx?$/,
    include: [pathJoin('src')],
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              // https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/plugins.json#L32
              { targets: { browsers: ['chrome >= 47'] }, useBuiltIns: 'usage', corejs: 3 }
            ],
            '@babel/preset-typescript',
            '@babel/preset-react'
          ],
          plugins: [
            ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import',
            'react-hot-loader/babel'
          ]
        }
      }
    ] //'awesome-typescript-loader'
  }
]

const fileRules = [
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
      'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
    ]
  }
]
module.exports = {
  rules: [...styleRules, ...scriptRules, ...fileRules]
}
