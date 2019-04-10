export default [
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/goods/examine/branchlist' },
      // goods
      {
        path: '/goods',
        name: '商品管理',
        icon: 'goods',
        routes: [

          // 审核
          {
            path: '/goods/examine/branchlist',
            name: '商品审核列表',
            component: './Goods/Examine/BranchList',
          },
          {
            path: '/goods/examine/branchdetail/:id',
            name: '审核商品详情',
            component: './Goods/Examine/BranchDetail',
            hideInMenu: true,            
          },

          // 排期
          {
            path: '/goods/schedule/branchlist',
            name: '商品排期列表',
            component: './Goods/Schedule/BranchList',
          },
          {
            path: '/goods/schedule/branchdetail/:id',
            name: '编辑商品详情',
            component: './Goods/Schedule/BranchDetail',
            hideInMenu: true,
          },

        ],
      },
      {
        path: '/city',
        name: '城市管理',
        icon: 'city',
        routes: [
          {
            path: '/city/cityList/branchList',
            name: '城市列表',
            component: './City/CityList/BranchList',
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
            component: './Supply/Purchase/List',
          },
          {
            path: '/supply/purchase/detail',
            name: '采购单详情',
            component: './Supply/Purchase/Detail',
            hideInMenu: true,
          },
          {
            path: '/supply/purchase/add',
            name: '采购单添加',
            component: './Supply/Purchase/Edit',
            hideInMenu: true,
          },
          {
            path: '/supply/purchase/edit',
            name: '采购单编辑',
            component: './Supply/Purchase/Edit',
            hideInMenu: true,
          },
          {
            path: '/supply/input/list',
            name: '入库单管理',
            component: './Supply/Input/List',
          },
          {
            path: '/supply/delivery/list',
            name: '配送单管理',
            component: './Supply/Delivery/List',
          },
          {
            path: '/supply/delivery/detail',
            name: '配送单详情',
            component: './Supply/Delivery/Detail',
            hideInMenu: true,
          },
          {
            path: '/supply/output/list',
            name: '出库单管理',
            component: './Supply/Output/List',
          },
          {
            path: '/supply/warehouse/list',
            name: '商品在仓库存管理',
            component: './Supply/Warehouse/List',
          },
          {
            path: '/supply/local/delivery/list',
            name: '本地配送范围管理',
            component: './Supply/LocalDelivery/BranchList',
          },
          // {
          //   path: '/supply/delivery/export',
          //   name: '送货单导出',
          //   component: './Supply/Delivery/Export',
          // },
        ],
      },
      // dashboard
      // { path: '/', redirect: '/dashboard/analysis' },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },
      // // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/basic/:id',
      //       name: 'basic',
      //       hideInMenu: true,
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     // exception
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //       component: './Exception/403',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //       component: './Exception/404',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //       component: './Exception/500',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //       component: './Exception/TriggerException',
      //     },
      //   ],
      // },
      // {
      //   name: 'account',
      //   icon: 'user',
      //   path: '/account',
      //   routes: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: './Account/Center/Center',
      //       routes: [
      //         {
      //           path: '/account/center',
      //           redirect: '/account/center/articles',
      //         },
      //         {
      //           path: '/account/center/articles',
      //           component: './Account/Center/Articles',
      //         },
      //         {
      //           path: '/account/center/applications',
      //           component: './Account/Center/Applications',
      //         },
      //         {
      //           path: '/account/center/projects',
      //           component: './Account/Center/Projects',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: './Account/Settings/Info',
      //       routes: [
      //         {
      //           path: '/account/settings',
      //           redirect: '/account/settings/base',
      //         },
      //         {
      //           path: '/account/settings/base',
      //           component: './Account/Settings/BaseView',
      //         },
      //         {
      //           path: '/account/settings/security',
      //           component: './Account/Settings/SecurityView',
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           component: './Account/Settings/BindingView',
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           component: './Account/Settings/NotificationView',
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        component: '404',
      },
    ],
  },

  // user
  // {
  //   path: '/user',
  //   component: '../layouts/UserLayout',
  //   routes: [
  //     { path: '/user', redirect: '/user/login' },
  //     { path: '/user/login', name: 'login', component: './User/Login' },
  //     { path: '/user/register', name: 'register', component: './User/Register' },
  //     {
  //       path: '/user/register-result',
  //       name: 'register.result',
  //       component: './User/RegisterResult',
  //     },
  //   ],
  // },
];
