// 获取类目表单配置
const getCategoryConfig = () => {
  return () => {
    return [
      {
          // TODO: 表单配配置，缺少 分类ID 的 value
          label: '当前选择类目',
          name: 'categoryName',
          status: 'preview',
          follow: true
      },
      {
          component: 'Button',
          name: 'categoryId',
          inline: true,
          when () {
              // 二次编辑商品，则不能修改类目，没有【修改类目】按钮
              return true
          },
          props: {
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
