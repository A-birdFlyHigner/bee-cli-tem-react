import Reg from '@/utils/reg'
import cityRule from '@/components/Rules/branchcitySel/index'
import timeRule from '@/components/Rules/timeSel/index'
import categoryRule from '@/components/Rules/category'

export default function(cityCode){
  return {
    settings:{
      value: {
        cityCode
      }
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
        label: '商品出售时间',
        name: ['saleStartTime', 'saleEndTime'],
        placeholder: ['请选择开始时间', '请选择结束时间'],
      }),
      cityRule({
        label: '城市',
        value: [],
        deep: 1,
      }),
      {
        label: '商品出售状态',
        name: 'saleStatus',
        component: 'Select',
        props: {
          placeholder: '请选择商品出售状态',
          options: [{
            label: '全部',
            value: 0,
          },{
            label: '出售中',
            value: 1,
          }, {
            label: '正在预热',
            value: 2
          }, {
            label: '等待上线',
            value: 3
          }]
        },
      },
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
        // onClick(err, values, formCore, listCore) {}
      },
      options: {
        type: 'submit',
        validate: true, // default true
      }
    }, {
      props: {
        children: '重置',
        // onClick(err, values, formCore, listCore) {}
      },
      options: {
        type: 'reset',
      }
    }]
  }
}