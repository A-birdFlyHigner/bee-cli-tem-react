export default {
  core: {
    initValues: {},
  },

  form: {
    inline: false,
    layout: {
      label: 'w120',
      columns: 3,
    },
  },

  items: [
    {
      label: '送货日期',
      name: 'deliveryDate',
      component: 'DatePicker',
      props: {
        placeholder: '请选择送货日期',
      },
    },
    {
      label: '仓库名称',
      name: 'warehouse',
      component: 'Input',
      props: {
        placeholder: '请输入仓库名称',
      },
    },
  ],

  buttons: [
    {
      props: {
        type: 'primary',
        children: '查询',
        onClick(err, values, formCore, listCore) {},
      },
      options: {
        type: 'submit',
        validate: true, // default true
      },
    },
    {
      props: {
        children: '重置',
        onClick(err, values, formCore, listCore) {},
      },
      options: {
        type: 'reset',
      },
    },
  ],
};
