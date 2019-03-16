import Reg from '@/utils/reg'
import cityRule from '@/components/Rules/citySel/index'
import categoryRule from '@/components/Rules/category'

export default function(cityCodes,provinceCodes) {
  console.log('---cityCode', cityCodes)
  console.log('---provinceCode', provinceCodes)
  
  const cityCode = cityCodes.toString()
  const provinceCode = provinceCodes.toString()
  
  return {
    settings:{
      value: {
        cityCode,
        provinceCode
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
      cityRule({
        label: '城市',
        value: [provinceCode,cityCode],
        deep: 2,
      }),
      {
        label: '分公司',
        name: 'companyName',
        component: 'Input',
        props: {
          placeholder: '请输入分公司',
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