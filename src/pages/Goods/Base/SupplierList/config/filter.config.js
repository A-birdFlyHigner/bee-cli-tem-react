import categoryRule from '@/components/Rules/category'

export default {
  settings: {
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
    categoryRule({
      label: '类目',
      name: 'categoryId',
      value: []
    }),
    {
      label: '商品名称',
      name: 'name',
      props: {
        placeholder: '请输入商品名称',
      },
    },
    {
      label: '商品Id',
      name: 'productId',
      props: {
        placeholder: '请输入商品Id',
      },
    },
    {
      label: 'skuId',
      name: 'skuId',
      props: {
        placeholder: '请输入skuId',
      },
    },
  ],

  buttons: [{
      props: {
        type: 'primary',
        children: '查询',
      },
      options: {
        type: 'submit',
      },
    },
    {
      props: {
        children: '重置',
      },
      options: {
        type: 'reset',
      },
    },
  ],
};
