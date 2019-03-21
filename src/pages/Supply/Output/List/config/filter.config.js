export default (values)=> {
  return {
    settings: {
      values,
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
        label: '出库开始时间',
        name: 'outboundTimeStart',
        component: 'DatePicker',
        props: {
          showTime: true,
          placeholder: '请选择出库开始时间',
        },
      },
      {
        label: '出库结束时间',
        name: 'outboundTimeEnd',
        component: 'DatePicker',
        props: {
          showTime: true,
          placeholder: '请选择出库结束时间',
        },
      },
      {
        label: '出库单号',
        name: 'outboundNo',
        component: 'Input',
        props: {
          placeholder: '请输入入库单号',
        },
      },
      {
        label: '配送单号',
        name: 'deliveryNo',
        component: 'Input',
        props: {
          placeholder: '请输入采购单号',
        },
      },
      {
        label: '仓库名称',
        name: 'warehouseCode',
        component: 'Select',
        props: {
          placeholder: '请选择采购订单状态',
          options: [],
        },
      },
    ],
    buttons: [
      {
        props: {
          type: 'primary',
          children: '查询',
          onClick(err, values, formCore, listCore) {
          },
        },
        options: {
          type: 'submit',
          validate: true, // default true
        },
      },
      {
        props: {
          children: '重置',
          onClick(err, values, formCore, listCore) {
          },
        },
        options: {
          type: 'reset',
        },
      },
    ],
  };
}
