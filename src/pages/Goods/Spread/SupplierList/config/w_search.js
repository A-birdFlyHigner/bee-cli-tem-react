import Reg from '@/utils/reg';

const cascaderData = [
  {
    value: '类目1',
    label: '类目1',
    children: [
      {
        value: '水果',
        label: '水果',
        children: [
          {
            value: '苹果',
            label: '苹果',
          },
          {
            value: '香蕉',
            label: '香蕉',
          },
          {
            value: '梨子',
            label: '梨子',
          },
          {
            value: '苹果1',
            label: '苹果1',
          },
          {
            value: '香蕉1',
            label: '香蕉1',
          },
          {
            value: '梨子1',
            label: '梨子1',
          },
        ],
      },
    ],
  },
  {
    value: '类目2',
    label: '类目2',
    children: [
      {
        value: '蔬菜',
        label: '蔬菜',
        children: [
          {
            value: '辣椒',
            label: '辣椒',
          },
        ],
      },
    ],
  },
];

export default {
  form: {
    inline: true, // 表单布局是否为行内样式
  },
  items: [
    {
      label: '类目',
      name: 'categoryId',
      component: 'Cascader',
      props: {
        placeholder: '请选择类目',
        options: cascaderData,
      },
    },
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
