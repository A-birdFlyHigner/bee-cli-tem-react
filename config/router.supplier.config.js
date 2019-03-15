export default [
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/goods/base/list' },

      // goods
      {
        path: '/goods',
        name: '商品管理',
        icon: 'goods',
        routes: [
          // 基础
          {
            path: '/goods/base/list',
            name: '基础商品列表',
            component: './Goods/Base/SupplierList',
          },
          {
            path: '/goods/publish',
            name: '新增商品',
            component: './Goods/Base/SupplierPublish',
            hideInMenu: true,
          },

          // 推广
          {
            path: '/goods/spread/list',
            name: '推广商品列表',
            component: './Goods/Spread/SupplierList',
          },
          {
            path: '/goods/spread/setting',
            name: '设置推广',
            component: './Goods/Spread/SupplierSetting',
            hideInMenu: true,
          },

          // 排期
          {
            path: '/goods/schedule/supplierlist',
            name: '供应商商品排期列表',
            component: './Goods/Schedule/SupplierList',
          },
        ],
      },
      {
        path: '/supply',
        name: '供应链',
        icon: 'supply',
        routes: [
          {
            path: '/supply/purchase/list',
            name: '采购单管理',
            component: './Supply/Purchase/SupplierList',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
