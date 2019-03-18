let title = ''
switch (ADMIN_TYPE) {
  case 'ADMIN':
  title = '小区乐管理后台'
  break;

  case 'BRANCH':
  title = '小区乐分公司后台'
  break;

  case 'SUPPLIER':
  title = '小区乐供应商后台'
  break;
  default:
  title = '小区乐后台'
}
module.exports = {
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false, // sticky siderbar
  menu: {
    disableLocal: true,
  },
  title,
  pwa: true,
  // your iconfont Symbol Scrip Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont图标项目里要进行批量去色处理
  iconfontUrl: '',
};
