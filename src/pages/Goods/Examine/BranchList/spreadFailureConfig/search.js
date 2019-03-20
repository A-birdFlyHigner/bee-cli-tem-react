import Reg from '@/utils/reg'
import cityRule from '@/components/Rules/branchcitySel/index'
import timeRule from '@/components/Rules/timeSel/index'
import categoryRule from '@/components/Rules/category'
// import moment from 'moment'

// const disabledDates = (current) => {
//   return current && current < moment().endOf('day')
// }

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
        message: '渠道商品Id,请输入数字'
      },
      props: {
        placeholder: '请输入渠道商品Id'
      },
    },
    timeRule({
      label: '提审时间',
      name: ['applyPromotionStartTime', 'applyPromotionEndTime'],
      placeholder: ['请选择开始时间', '请选择结束时间'],
    }),
    timeRule({
      label: '未通过时间段',
      name: ['promotionFailStartTime', 'promotionFailEndTime'],
      placeholder: ['请选择开始时间', '请选择结束时间'],
    }),
    // {
    //   label: '商品发货时效',
    //   name: 'spreadTime',
    //   component: 'Select',
    //   props: {
    //     placeholder: '请选择发货时效',
    //     options: [{
    //       label: '次日达',
    //       value: 1,
    //     }, {
    //       label: '预售',
    //       value: 2
    //     }]
    //   },
    //   // val 表单值集合 core 表单核心 当values改变的时候，when就会去判断是否命中，如果命中就会重新渲染这部分 
    //   when: (val) => {
    //     return val.type !== 3
    //   }
    // },
    cityRule({
      label: '城市',
      value: [],
      deep: 1,
    }),
    // {
    //   label: '商品Id',
    //   name: 'productId',
    //   component: 'Input',
    //   rules: {
    //     pattern: Reg.Num,
    //     message: '商品Id,请输入数字'
    //   },
    //   props: {
    //     placeholder: '请输入商品Id'
    //   },
    // },
    {
      label: '渠道skuId',
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
      validateWithoutRender: false,
      validateAfter: (err)=> {
        if(err) return false
        return true
      }
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