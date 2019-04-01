import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './scheduledConfig/search'
import operationConfig from './scheduledConfig/operation'
import tableConfig from './scheduledConfig/table'
import { listScheduledProduct } from '@/services/goods'
import { leListQuery } from '@/utils/utils'

export default class Scheduled extends Component {

  constructor(props) {
    super()
    this.store = props
    this.state = {
      cityCode: this.store.cityCode||''
    }
  }
  
  onMountLeList = (leList)=>{
    this.leList = leList
  }

  render () {
    const { cityCode }= this.state
    const config = {
      filterConfig: filterConfig(cityCode),
      operationConfig,
      tableConfig,
      ...leListQuery(listScheduledProduct)
    }
    return (
      <LeList {...config} onMount={this.onMountLeList} />
    )
  }
}
