// 获取底部按钮表单配置
const getButtonsConfig = () => {
  return [{
      props: {
        type: 'primary',
        children: '保存',
        onClick(err, values, leForm) {
        }
      },
      options: {
        type: 'submit',
      },
    },
    {
      props: {
        children: '取消',
        onClick(err, values, leForm) {}
      },
    }
  ]
}

export default getButtonsConfig
