import categoryRule from '@/components/Rules/category'
import regUtils from '@/utils/reg'

export default {
  settings: {
    initValues: {},
    autoValidate: true,
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
      rules: {
        pattern: regUtils.Number,
        message: '商品Id,请输入数字'
      }
    },
    {
      label: 'skuId',
      name: 'skuId',
      props: {
        placeholder: '请输入skuId',
      },
      rules: {
        pattern: regUtils.Number,
        message: 'skuId,请输入数字'
      }
    },
  ],

  buttons: [
    {
      props: {
        type: 'primary',
        children: '查询',
      },
      options: {
        type: 'submit',
        validateAfter (err) {
          return err === null
        }
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
