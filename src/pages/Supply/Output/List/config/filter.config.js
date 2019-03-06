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
      label: '出库时间',
      name: 'outputTime',
      component: 'DatePicker',
      props: {
        placeholder: '请选择出库时间',
      },
    },
    {
      label: '出库单号',
      name: 'outputNo',
      component: 'Input',
      props: {
        placeholder: '请输入出库单号',
      },
    },
    {
      label: '上游单号',
      name: 'upperNo',
      component: 'Input',
      props: {
        placeholder: '请输入上游单号',
      },
    },
    {
      label: '仓库名称',
      name: 'warehouseName',
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
