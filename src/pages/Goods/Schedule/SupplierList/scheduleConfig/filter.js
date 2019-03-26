import Reg from '@/utils/reg';
import categoryRule from '@/components/Rules/category';

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
      name: 'categoryId',
      value: []
    }),
    {
      label: '商品名称',
      name: 'productName',
      component: 'Input',
      props: {
        placeholder: '请输入商品名称',
      },
    },
    {
      label: '渠道商品Id',
      name: 'channelProductId',
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
      label: '基础商品Id',
      name: 'baseProductId',
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
      label: '排期类型',
      name: 'scheduleType',
      component: 'Select',
      props: {
        placeholder: '请选择商品出售状态',
        options: [{
          label: '默认普通排期',
          value: 0,
        },{
          label: '秒杀品排期',
          value: 1,
        },]
      },
    },
    {
      label: '渠道skuId',
      name: 'skuId',
      component: 'Input',
      rules: {
        pattern: Reg.Num,
        message: '渠道skuId,请输入数字',
      },
      props: {
        placeholder: '请输入渠道skuId',
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
