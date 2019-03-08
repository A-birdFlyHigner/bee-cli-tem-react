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
      name: 'branchCompanyName',
      component: 'Select',
      props: {
        placeholder: '请选择分公司',
        options: [{
          label: '分公司1',
          value: 1,
        }, {
          label: '分公司2',
          value: 2
        }]
      },
      // val 表单值集合 core 表单核心 当values改变的时候，when就会去判断是否命中，如果命中就会重新渲染这部分 
      when: (val) => {
        return val.type !== 3
      }
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