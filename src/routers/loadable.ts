/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-15 14:16:03
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-15 14:18:25
 */
//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
import Loadable from 'react-loadable'
import loadingComponent from '@components/PageLoading'
export default (loader: any, loading = loadingComponent) => {
  return Loadable({
    loader,
    loading
  })
}
