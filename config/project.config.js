/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-21 11:13:00
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-23 10:24:19
 */
module.exports = {
  title: 'xxx lepage-ts模版',
  devServer: {
    port: 3366,
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    proxy: {
      '/selectionAdmin': {
        target: 'https://h5test.gegejia.com',
        secure: false,
        changeOrigin: true,
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('x-referer', 'https://h5test.gegejia.com/selectionAdmin')
        }
      }
    }
  }
}
