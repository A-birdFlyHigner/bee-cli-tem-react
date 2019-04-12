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
            component: './LePage/Form',
            icon: 'icon-shangpinguanli-baise'
          },
          {
            path: '/lepage/list',
            name: '列表',
            component: './LePage/List',
            icon: 'icon-shangpinguanli-baise'
          },
          {
            path: '/lepage/preview',
            name: '预览',
            component: './LePage/Preview/Base',
            icon: 'icon-shangpinguanli-baise'
          },
          {
            path: '/lepage/preview-dynamic',
            name: '预览-动态',
            component: './LePage/Preview/Dynamic',
            icon: 'icon-shangpinguanli-baise'
          },
          {
            path: '/lepage/preview-columns',
            name: '预览-多列',
            component: './LePage/Preview/Columns',
            icon: 'icon-shangpinguanli-baise'
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
