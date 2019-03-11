import proSetting from './product'
import Sty from '../Index.less'
import Reg from '@/utils/reg'

export default (options, spreadName, configOption) => {
  return {
    settings: {
      value: { ...options },
      autoValidate: true,
      scrollToError: true,
    },
    form: {
      inline: false,
    },
    items: [{
      label: '',
      name: 'spreadName',
      status: 'preview',
      className: Sty.spanColor
    }, {
      label: '配送方式',
      name: 'logisticsMethod',
      component: 'Select',
      rules: {
        required: true,
        message: '请选择配送方式'
      },
      props: {
        placeholder: '请选择配送方式',
        options: [{
          label: '落地配',
          value: 1
        }, {
          label: '入仓',
          value: 2
        }, {
          label: '快递配送',
          value: 3
        }]
      }
    }, {
      label: '发货时效',
      name: 'logisticsType',
      component: 'Select',
      rules: (values) => {
        const { logisticsMethod } = values
        return (logisticsMethod === 3) ? null : {
          required: true,
          type: 'number',
          message: '请选择发货时效'
        }
      },
      props: {
        placeholder: '请选择发货时效',
        options: [{
          label: '次日达',
          value: 1
        }, {
          label: '预售',
          value: 2
        }]
      },
      when: (val) => {
        const { productIds=[] } = val
        if (!productIds.length) {
          configOption.deleteFun.call(configOption.self, spreadName)
        }
        return val.logisticsMethod !== 3
      }
    }, {
      label: '发货时间',
      name: 'dispatchDate',
      component: 'Input',
      rules: (values) => {
        const { logisticsMethod, logisticsType } = values
        if (logisticsMethod === 3) {
          return null
        }
        if (logisticsType === 1) {
          return null
        }
        return [{
          required: true,
          message: '请输入发货天数'
        }, {
          pattern: Reg.Num,
          message: '请输入发货天数，数字，大于0'
        }]
      },
      props: {
        className: Sty.dispatchDate,
        placeholder: '',
        prefix: 'T+',
        suffix: '天',
      },
      when: (val) => {
        return val.logisticsMethod !== 3 && val.logisticsType !== 1
      }
    },
    proSetting(options.productIds)
    ]
  }
}