export default {
  core: {
    // values: {
    //     confirm: 2
    // },
    initValues: {
      status: 0,
      origin: 2,
      confirm: 2,
    },
  },
  form: {
    inline: false,
    layout: {
      label: 'w120',
      columns: 3,
    },
  },

  items: [{
      label: '采购时间',
      name: 'purchasing',
      component: 'DatePicker',
      props: {
        placeholder: '请选择采购时间',
      },
    },
    {
      label: '仓库名称',
      name: 'warehouse',
      component: 'Input'
    },
    {
      label: '供应商名称',
      name: 'supplier',
      component: 'Input',
    },
    {
      label: '采购订单状态',
      name: 'status',
      component: 'Select',
      value: 0,
      props: {
        placeholder: '请选择采购订单状态',
        options: [{
            label: '全部',
            value: 0,
          },
          {
            label: '待提交',
            value: 1,
          },
          {
            label: '未入库',
            value: 2,
          },
          {
            label: '入库完成',
            value: 3,
          },
          {
            label: '取消',
            value: 4,
          },
        ],
      },
    },
    {
      label: '采购订单来源',
      name: 'origin',
      component: 'Select',
      props: {
        placeholder: '请选择采购订单来源',
        options: [{
            label: '全部',
            value: 0,
          },
          {
            label: '系统生成',
            value: 1,
          },
          {
            label: '人工创建',
            value: 2,
          },
        ],
      },
    },
    {
      label: '供应商确认状态',
      name: 'confirm',
      component: 'Select',
      props: {
        placeholder: '请选择供应商确认状态',
        options: [{
            label: '全部',
            value: 0,
          },
          {
            label: '待确认',
            value: 1,
          },
          {
            label: '已确认',
            value: 2,
          },
        ],
      },
    },
  ],

  buttons: [{
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
    {
      props: {
        type: 'danger',
        children: '导出',
        onClick(err, values, formCore, listCore) {},
      },
      options: {
        type: 'none',
        validate: true,
      },
    },
  ],
};
