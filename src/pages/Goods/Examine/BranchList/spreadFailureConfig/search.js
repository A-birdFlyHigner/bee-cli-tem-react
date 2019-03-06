import Reg from '@/utils/reg'
import cityRule from '@/components/Rules/citySel/index.js'
import timeRule from '@/components/Rules/timeSel/index.js'

const cascaderData = [{
  value: '类目1',
  label: '类目1',
  children: [{
    value: '水果',
    label: '水果',
    children: [{
      value: '苹果',
      label: '苹果',
    },{
      value: '香蕉',
      label: '香蕉',
    },{
      value: '梨子',
      label: '梨子',
    },{
      value: '苹果1',
      label: '苹果1',
    },{
      value: '香蕉1',
      label: '香蕉1',
    },{
      value: '梨子1',
      label: '梨子1',
    }],
  }],
}, {
  value: '类目2',
  label: '类目2',
  children: [{
    value: '蔬菜',
    label: '蔬菜',
    children: [{
      value: '辣椒',
      label: '辣椒',
    }],
  }],
}]

export default {
  form: {
    inline: true, // 表单布局是否为行内样式
  },
  items: [
    {
      label: '类目',
      name: 'category',
      component: 'Cascader',
      props: {
        placeholder: '请选择类目',
        options: cascaderData
      },
    },
    {
      label: '店铺名称',
      name: 'shopName',
      component: 'Input',
      props: {
        placeholder: '请输入店铺名称'
      },
    },
    {
      label: '店铺Id',
      name: 'shopId',
      component: 'Input',
      rules: {
        pattern: Reg.Num,
        message: '店铺Id,请输入数字'
      },
      props: {
        placeholder: '请输入店铺Id'
      },
    },
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
      name: 'chanleProductId',
      component: 'Input',
      rules: {
        pattern: Reg.Num,
        message: '渠道商品Id,请输入数字'
      },
      props: {
        placeholder: '请输入渠道商品Id'
      },
    },
    timeRule({
      label: '提审时间',
      name: ['startTime1', 'endTime1'],
    }),
    timeRule({
      label: '未通过时间段',
      name: ['startTime2', 'endTime2'],
    }),
    {
      label: '商品发货时效',
      name: 'spreadTime',
      component: 'Select',
      props: {
        placeholder: '请选择发货时效',
        options: [{
          label: '次日达',
          value: 1,
        }, {
          label: '预售',
          value: 2
        }]
      },
      // val 表单值集合 core 表单核心 当values改变的时候，when就会去判断是否命中，如果命中就会重新渲染这部分 
      when: (val, core) => {
        return val.type !== 3
      }
    },
    cityRule({
      label: '城市',
      value: [],
      deep: 2,
    }),
    {
      label: '商品Id',
      name: 'productId',
      component: 'Input',
      rules: {
        pattern: Reg.Num,
        message: '商品Id,请输入数字'
      },
      props: {
        placeholder: '请输入商品Id'
      },
    },
    {
      label: 'skuId',
      name: 'skuId',
      component: 'Input',
      rules: {
        pattern: Reg.Num,
        message: 'skuId,请输入数字'
      },
      props: {
        placeholder: '请输入skuId'
      },
    },
  ],
  buttons: [{
    props: {
      type: 'primary',
      children: '查询',
      onClick(err, values, formCore, listCore) {}
    },
    options: {
      type: 'submit',
      validate: true, // default true
    }
  }, {
    props: {
      children: '重置',
      onClick(err, values, formCore, listCore) {}
    },
    options: {
      type: 'reset',
    }
  }]
}