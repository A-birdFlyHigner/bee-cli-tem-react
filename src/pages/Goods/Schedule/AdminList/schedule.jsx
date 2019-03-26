import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './saleingConfig/search'
import operationConfig from './saleingConfig/operation'
import tableConfig from './saleingConfig/table'
import { querySchedulingProductList } from '@/services/goods'
import { leListQuery } from '@/utils/utils'

export default class Saleing extends Component {

  constructor(props) {
    super()
    this.store = props
    this.state = {
      cityCode: this.store.cityCode||'',
      provinceCode: this.store.provinceCode||'',
    }
  }
  
  render () {
    const { cityCode,provinceCode }= this.state    
    const config = {
      filterConfig: filterConfig(cityCode,provinceCode),
      operationConfig,
      tableConfig: tableConfig('2'),      
      ...leListQuery(querySchedulingProductList)
    }
    return (
      <LeList {...config} />
    )
  }
}
