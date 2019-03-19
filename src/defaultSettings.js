const defaultSettings = require('../common/defaultSettings')

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
  ...defaultSettings,
  title
};
