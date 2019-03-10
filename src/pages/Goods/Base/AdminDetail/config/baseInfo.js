export default [{
    label: '当前选择类目',
    name: 'pathName',
  }, {
    label: '基础信息',
    className: 'box-header',
  }, {
    label: '商品长名称',
    name: 'name',
  }, {
    label: '商品短名称',
    name: 'desc',
  }, {
    label: '品牌',
    name: 'brandName',
    when: (values) => {
      return !!values.brandName
    }
  }, ]