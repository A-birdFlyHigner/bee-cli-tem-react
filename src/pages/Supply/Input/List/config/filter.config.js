export default {
  core: {
    initValues: {
      status: 0,
      origin: 0,
      confirm: 0,
    },
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
      label: '入库时间',
      name: 'inputTime',
      component: 'DatePicker',
      props: {
        placeholder: '请选择入库时间',
      },
    },
    {
      label: '入库单号',
      name: 'inputNo',
      component: 'Input',
      props: {
        placeholder: '请输入入库单号',
      },
    },
    {
      label: '采购单号',
      name: 'purchaseNo',
      component: 'Input',
      props: {
        placeholder: '请输入采购单号',
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
    {
      label: '供应商名称',
      name: 'supplierName',
      component: 'Input',
      props: {
        placeholder: '请输入供应商名称',
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
    // {
    //   props: {
    //     type: 'danger',
    //     children: '导出',
    //     onClick(err, values, formCore, listCore) {},
    //   },
    //   options: {
    //     type: 'none',
    //     validate: true,
    //   },
    // },
  ],
};
