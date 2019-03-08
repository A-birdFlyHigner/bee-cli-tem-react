import Reg from '@/utils/reg';
import cityRule from '@/components/Rules/citySel/index.js';
import categoryRule from '@/components/Rules/category';

export default {
  form: {
    inline: true, // 表单布局是否为行内样式
  },
  items: [
    categoryRule({
      label: '类目',
      name: 'categoryId',
      value: ["410000", "410300", "410304"]
    }),
    {
      label: '商品名称',
      name: 'name',
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
    cityRule({
      label: '城市',
      value: [],
      deep: 2,
    }),
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