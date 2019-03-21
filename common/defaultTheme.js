const colors = {
  primary : '#1A1A1A',
  auxiliary: '#0076FF',
  error: '#F1002D',
  white: '#FFFFFF',
  primaryActive: '#000000',

  text: '#333333',
  text2: '#666666',
  text3: '#999999',
  label: '#666666', // 标注文字
  line: '#E0E0E0', // 分割线
  textHover: '#333333',
  textActivity: '#333333',
  
  bg: '#F0F0F0',
  boxHover: '#FAFAFA',
}

module.exports = {
  // Layout
  'layout-header-background':colors.primary,
  'layout-header-height': '80px',
  'nav-header-height': '80px',
  // 导航
  'layout-sider-background': '#404040',
  'menu-dark-bg': '#404040',
  'menu-item-color': colors.white,
  'menu-dark-submenu-bg': colors.primary,
  'menu-item-active-bg': colors.primaryActive,
  'menu-dark-item-active-bg': colors.primaryActive,
  'menu-dark-highlight-color': '#FFE624',
  // 通体
  'primary-color': colors.text,
  'layout-body-background': colors.bg,
  'text-color': '#333333',
  // Buttons
  'btn-primary-color': colors.primary,
  'btn-primary-bg': '#FFE624',
  // 下拉框
  'item-hover-bg': '#F5F5F5',
  'item-hover-color': '#333333',
  'item-active-bg': '#F5F5F5',
  // 表格
  'table-row-hover-bg': colors.boxHover,
  'table-selected-row-bg': '#FAFAFA',
  //  行高
  'line-height-base': 1,
  // Tree
  // 'tree-directory-selected-bg': '#FFFFFF',
  // Radio
  'radio-dot-color': colors.auxiliary,
  // Checkbox
  'checkbox-color': colors.auxiliary,
  // Breadcrumb
  'breadcrumb-link-color-hover': colors.primary,

  // tabs
  'tabs-title-font-size': '16px',
  'tabs-horizontal-padding': '6px 16px',
  // zIndex
  'zindex-dropdown': 100001,
  'zindex-message': 100000,

}
