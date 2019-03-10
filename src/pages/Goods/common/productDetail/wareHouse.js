import React from 'react'
import Sty from './index.less'

const whenFun = (values) => {
  const { warehouseProperties = [], logisticsMethod = 0 } = values
  return !!warehouseProperties.length && logisticsMethod !== 3
}

export default [{
    label: '仓库属性',
    className: 'box-header',
    when: whenFun
  }, {
    component: 'Item',
    name: 'warehouseProperties',
    value: [{
      propertyNameId: 1,
      propertyName: '重量',
      propertyValue: ['1kg', '2kg']
    }, {
      propertyNameId: 2,
      propertyName: '重量',
      propertyValue: ['1kg', '2kg']
    }],
    render (values) {
      const { warehouseProperties = [] } = values
      return (
        warehouseProperties.map(item => {
          const { propertyValue = [] } = item
          return (
            <div className={Sty.rowDiv} key={item.propertyNameId}>
              <span className={Sty.label}>{item.propertyName}</span>
              <span className={Sty.value}>{propertyValue.join(';')}</span>
            </div>
          )
        })
      )
    },
    when: whenFun
  }
]