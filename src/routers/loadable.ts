/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-15 14:16:03
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-18 18:11:22
 */
import Loadable from 'react-loadable'
import loadingComponent from '@components/PageLoading'
export default (loader: any) => {
  return Loadable({
    loader,
    loading: loadingComponent
  })
}
