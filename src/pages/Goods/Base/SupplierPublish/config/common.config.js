import React from 'react'

export const SALE_PROPERTY_NAME_ID = 'salePropertyNameId'

export const GOODS_PROPERTY_NAME_ID = 'goodsPropertyNameId'

export const WAREHOUSE_PROPERTY_NAME_ID = 'warehousePropertyNameId'

export const FN = () => {}

export const getHead = (title) => {
  return {
  component: 'Item',
    render () {
      return <div><b>{title}</b></div>
    }
  }
}

export const getTip = (msg) => {
  return {
    component: 'Item',
    render () {
      return <div>{msg}</div>
    }
  }
}
