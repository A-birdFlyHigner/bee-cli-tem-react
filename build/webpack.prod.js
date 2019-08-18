/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-08 15:00:58
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-18 13:05:40
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const pathJoin = require('./webpack.utils').pathJoin
const analyz = process.argv[2] === 'analyz'
const optimization = {
  // splitChunks: {
  //   cacheGroups: {
  //     default: false,
  //     buildup: {
  //       chunks: 'all',
  //       test: /[\\/]node_modules[\\/]/
  //     },
  //     vendor: {
  //       name: 'vendor',
  //       test: /[\\/]node_modules[\\/](react|react-dom|lodash|moment|immutable|mobx|mobx-react|axios)[\\/]/,
  //       chunks: 'all',
  //       priority: 10
  //     }
  //   }
  // },
  minimizer: [
    new TerserPlugin({
      parallel: true,
      parallel: true,
      sourceMap: false
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        reduceIdents: false,
        autoprefixer: false
      }
    })
  ]
}

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'style/[name].[hash:5].css',
    chunkFilename: 'style/[name].[id].[contenthash].css'
  })
]
analyz && plugins.push(new BundleAnalyzerPlugin())
module.exports = {
  devtool: false,
  optimization,
  plugins,
  output: {
    filename: 'script/[name].[hash:5].js',
    chunkFilename: 'script/[name].[hash:5].chunk.js', //动态import文件名
    path: pathJoin('dist'),
    publicPath: './'
  },
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
}
