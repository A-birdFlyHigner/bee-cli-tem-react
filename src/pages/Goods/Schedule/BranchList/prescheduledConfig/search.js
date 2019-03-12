import Reg from '@/utils/reg'
import cityRule from '@/components/Rules/branchcitySel/index'
import timeRule from '@/components/Rules/timeSel/index'
import categoryRule from '@/components/Rules/category'

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
      label: '分公司',
      name: 'companyName',
      component: 'Input',
      props: {
        placeholder: '请输入分公司',
      },
    },
    {
      label: '总部商品审核状态',
      name: 'reviewStatus',
      component: 'Select',
      props: {
        placeholder: '请选择商品审核状态',
        options: [{
          label: '已拒绝',
          value: 1,
        }, {
          label: '待审核',
          value: 2
        }]
      },
      // val 表单值集合 core 表单核心 当values改变的时候，when就会去判断是否命中，如果命中就会重新渲染这部分 
      when: (val) => {
        return val.type !== 3
      }
    }, 
    cityRule({
      label: '城市',
      value: [],
      deep: 1,
    }),
    timeRule({
      label: '总部审核时间',
      name: ['reviewStartTime', 'reviewEndTime'],
      placeholder: ['请选择开始时间', '请选择结束时间'],
    }),
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