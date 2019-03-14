import cityRule from '@/components/Rules/citySel/index'

export default {
  form: {
    inline: true, // 表单布局是否为行内样式
  },
  items: [ 
    cityRule({
      label: '城市',
      value: [],
      deep: 2,
    }),
    {
      label: '所属分公司',
      name: 'partnerCompanyId',
      component: 'Input',
      props: {
        placeholder: '请输入所属分公司',
      },
    },
  ],
  buttons: [{
    props: {
      type: 'primary',
      children: '查询',
      onClick() {}
    },
    options: {
      type: 'submit',
      validate: true, // default true
    }
  }, {
    props: {
      children: '重置',
      onClick() {}
    },
    options: {
      type: 'reset',
    }
  }]
}