/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-22 15:16:53
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-23 11:18:09
 */
import { RoutesConfig } from 'router'

export const routes: RoutesConfig[] = [
  {
    path: '/nav1/page1',
    component: () => import('@views/nav1/page1')
  },
  {
    path: '/nav1/page2',
    component: () => import('@views/nav1/page2')
  }
]
