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
    {
      label: '商品ID',
      name: 'goodsId',
      component: 'Input',
      props: {
        placeholder: '请输入商品ID',
      },
    },
    {
      label: 'SKU编码',
      name: 'SKU_No',
      component: 'Input',
      props: {
        placeholder: '请输入SKU编码',
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
