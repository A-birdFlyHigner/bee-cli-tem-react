/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-15 10:01:02
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-17 19:05:25
 */
import DeliveryRouter from './modules/delivery'

/**
 * Route-Map
 * 路由映射表
 * 用于建立映射路由配置，有先后顺序，路由依次向下 fallback
 * path：路由路径
 * component：路由对应的页面级组件
 */
export default [...DeliveryRouter]
