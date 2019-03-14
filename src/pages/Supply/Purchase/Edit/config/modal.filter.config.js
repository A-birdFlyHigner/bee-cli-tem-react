export default (params) => {
  return {
    settings: {
      values: params
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
        label: '商品类目',
        name: 'categoryId',
        component: 'Input',
        props: {
          placeholder: '请选择商品类目',
        },
      },
      {
        label: '商品名称',
        name: 'name',
        component: 'Input',
        props: {
          placeholder: '请输入商品名称',
        },
      },
      {
        label: 'SKU编码',
        name: 'skuId',
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
