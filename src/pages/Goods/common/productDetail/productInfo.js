import React from 'react'
import Sty from './index.less'

const whenFun = (values) => {
  const { properties = [] } = values
  return !!properties.length
}

export default [{
    label: '商品属性',
    className: 'box-header',
    when: whenFun
  }, {
    component: 'Item',
    name: 'properties',
    value: [],
    render (values) {
      const { properties = [] } = values
      return (
        properties.map(item => {
          const { propertyName, propertyValue = [] } = item
          return (
            <div className={Sty.rowDiv} key={item.propertyNameId}>
              <span className={Sty.label}>{propertyName}</span>
              <span className={Sty.value}>{propertyValue.join(';')}</span>
            </div>
          )
        })
      )
    },
    when: whenFun
  }
]