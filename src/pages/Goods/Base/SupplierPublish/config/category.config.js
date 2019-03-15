// 获取类目表单配置
const getCategoryConfig = (globalOptions = {}) => {
  return () => {
    return [
      {
          label: '当前选择类目',
          name: 'categoryName',
          status: 'preview',
          follow: true
      },
      {
          component: 'Button',
          name: 'categoryId',
          inline: true,
          when: globalOptions.status === 'create',
          props: {
              size: 'small',
              children: '修改类目',
              onClick (err, values, leForm) {
                // 创建商品，二次编辑分类
                leForm.emit('edit-category', values)
              }
          }
      },
    ]
  }
}

export default getCategoryConfig
