import Reg from '@/utils/reg'
import cityRule from '@/components/Rules/citySel/index'
import categoryRule from '@/components/Rules/category'
import moment from 'moment'

const disabledDates = (current) => {
  return current && current < moment().endOf('day')
}

export default {
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
    {
      label: '提审时间',
      name: 'arraignTime',
      component: 'RangePicker',
      className: 'globalRange',                    
      value: [],
      props: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['请选择开始时间', '请选择结束时间'],
        showTime: true,
        disabledDate: disabledDates
      },
    },
    {
      label: '未通过时间段',
      name: 'nopassTime',
      component: 'RangePicker',
      className: 'globalRange',                    
      value: [],
      props: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['请选择开始时间', '请选择结束时间'],
        showTime: true,
        disabledDate: disabledDates        
      },
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
      onClick() {}
    },
    options: {
      type: 'submit',
      validate: true, // default true
    }
  }, {
    props: {
      children: '重置',
      onClick() {}
    },
    options: {
      type: 'reset',
    }
  }]
}