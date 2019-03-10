import React from 'react'

export default [{
  label: '物流配送',
  className: 'box-header',
}, {
  label: '配送方式',
  name: 'logisticsMethod',
  render: (values) => {
    const { logisticsMethod = 0 } = values
    return (
      <span>{['', '落地配', '入仓', '快递配送'][logisticsMethod]}</span>
    )
  }
}, {
  label: '发货时效',
  name: 'logisticsType',
  render: (values) => {
    const { logisticsType = 0 } = values
    return (
      <span>{['', '次日达', '预售'][logisticsType]}</span>
    )
  },
  when: (values) => {
    const { logisticsMethod = 0 } = values
    return logisticsMethod !== 3
  }
}, {
  label: '发货时间',
  name: 'dispatchDate',
  props: {
    suffix: '天'
  },
  when: (values)=> {
    const { logisticsMethod = 0, logisticsType = 0 } = values
    return logisticsMethod !== 3 && logisticsType !== 1
  }
}]