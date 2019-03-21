import Reg from '@/utils/reg';
import categoryRule from '@/components/Rules/category'

export default {
  settings: {
    autoValidate: true,
  },
  form: {
    inline: true, // 表单布局是否为行内样式
  },
  items: [
    categoryRule({
      label: '类目',
      value: []
    }),
    {
      label: '商品Id',
      name: 'productId',
      component: 'Input',
      rules: {
        pattern: Reg.Num,
        message: '商品Id,请输入数字',
      },
      props: {
        placeholder: '请输入商品Id',
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
      label: 'skuId',
      name: 'skuId',
      component: 'Input',
      rules: {
        pattern: Reg.Num,
        message: 'skuId,请输入数字',
      },
      props: {
        placeholder: '请输入skuId',
      },
    },
  ],
  buttons: [
    {
      props: {
        type: 'primary',
        children: '查询',
        onClick() {},
      },
      options: {
        type: 'submit',
        validateAfter: (err) => {
          return !err
        }
      },
    },
    {
      props: {
        children: '重置',
        onClick() {},
      },
      options: {
        type: 'reset',
      },
    },
  ],
};
