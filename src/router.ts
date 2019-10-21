/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-22 15:16:53
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-23 10:36:58
 */
import { lazy, LazyExoticComponent, ComponentType } from 'react'

export interface RoutesConfig {
  path: string

  component: () => Promise<{ default: any }>
}

export interface ExportRouteConfig {
  path: string

  component: LazyExoticComponent<ComponentType>
}

const webpackRoutesContext = (require as any).context('./views', true, /routes.ts$/)
const pathsList: string[] = webpackRoutesContext.keys()
let routeList: ExportRouteConfig[] = []
pathsList.forEach((path: string): void => {
  const routesConfigModule = webpackRoutesContext(path)
  if (routesConfigModule) {
    const routes = [...routesConfigModule.routes, { path: '/home', component: () => import('@views/home') }]
    if (routes && routes.length) {
      routes.forEach(({ component, path }: RoutesConfig) => {
        routeList.push({
          path,
          component: lazy(component)
        })
      })
    }
  }
})
export default routeList
