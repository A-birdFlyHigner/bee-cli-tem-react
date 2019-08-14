/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-13 14:32:33
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-13 14:32:41
 */
export default [
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/' },
      // lepage
      {
        path: '/lepage',
        name: 'LePage 示例',
        icon: 'icon-shangpinguanli-baise',
        routes: [
          {
            path: '/lepage/form',
            name: '表单',
            component: './LePage/Form/Index',
            icon: 'icon-shangpinguanli-baise'
          },
          {
            path: '/lepage/list',
            name: '列表',
            component: './LePage/List/Index',
            icon: 'icon-shangpinguanli-baise'
          },
          {
            path: '/lepage/preview',
            name: '预览',
            component: './LePage/Preview/Base/Index',
            icon: 'icon-shangpinguanli-baise'
          },
          {
            path: '/lepage/preview-dynamic',
            name: '预览-动态',
            component: './LePage/Preview/Dynamic/Index',
            icon: 'icon-shangpinguanli-baise'
          },
          {
            path: '/lepage/preview-columns',
            name: '预览-多列',
            component: './LePage/Preview/Columns/Index',
            icon: 'icon-shangpinguanli-baise'
          }
        ]
      },
      {
        component: '404'
      }
    ]
  }
]
