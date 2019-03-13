// https://umijs.org/config/
import os from 'os';
import adminRoutes from './router.admin.config';
import branchRoutes from './router.branch.config';
import supplierRoutes from './router.supplier.config';
import webpackPlugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';
import slash from 'slash2';

const { pwa, primaryColor } = defaultSettings;
const { NODE_ENV, APP_TYPE, TEST, ADMIN_TYPE = 'ADMIN' } = process.env;

let pageRoutes = []
switch (ADMIN_TYPE) {
  case 'ADMIN':
  pageRoutes = adminRoutes
  break;

  case 'BRANCH':
  pageRoutes = branchRoutes
  break;

  case 'SUPPLIER':
  pageRoutes = supplierRoutes
  break;
}

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        enable: true, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : {},
      ...(!TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime'],
            },
            hardSource: false,
          }
        : {}),
    },
  ],
];

export default {
  // add for transfer to umi
  plugins,
  history: 'hash',
  outputPath: './dist/le' + ADMIN_TYPE.toLowerCase(),
  base: '/le' + ADMIN_TYPE.toLowerCase() + '/',
  publicPath: '/le' + ADMIN_TYPE.toLowerCase() + '/',
  define: {
    APP_TYPE: APP_TYPE || '',
    ADMIN_TYPE: ADMIN_TYPE || ''
  },
  treeShaking: true,
  targets: {
    ie: 11,
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
    bizcharts: 'BizCharts',
  },
  proxy: { 
    '/adminApi': {
      // target: 'http://test-life-admin.51bushou.com/api', // 管理后台
      // target: 'http://test-life-seller.51bushou.com/api',  // 分公司店铺后台
      // target: 'http://192.168.0.220:10002/api', //飞雪
      target: 'http://192.168.1.46:10003/api', //瓶子
      // target: 'http://192.168.0.162:10002/api', //卫卫
      changeOrigin: true,
      pathRewrite: { '^/adminApi': '' },
    },
  },
  devServer: {
    // contentBase: './dist',
    // publicPath: '/lebranch/'
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },

  chainWebpack: webpackPlugin,
};
