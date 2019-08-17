/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-15 10:15:02
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-17 19:05:33
 */
import Loadable from '../loadable'
export default [
  {
    path: '/delivery/pageList',
    compoent: Loadable(() => import(/* webpackChunkName: "pageList" */ '@views/delivery/pageList'))
  },
  {
    path: '/delivery/resourcesList',
    compoent: Loadable(() => import(/* webpackChunkName: "resourcesList" */ '@views/delivery/resourcesList'))
  },
  {
    path: '/delivery/throwList',
    compoent: Loadable(() => import(/* webpackChunkName: "throwList" */ '@views/delivery/throwList'))
  },
  {
    path: '/delivery/operatingList',
    compoent: Loadable(() => import(/* webpackChunkName: "operatingList" */ '@views/delivery/operatingList'))
  },
  {
    path: '/delivery/selectionList',
    compoent: Loadable(() => import(/* webpackChunkName: "selectionList" */ '@views/delivery/selectionList'))
  }
]
