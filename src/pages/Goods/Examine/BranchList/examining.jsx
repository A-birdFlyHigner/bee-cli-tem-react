import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './examiningConfig/search'
import operationConfig from './examiningConfig/operation'
import tableConfig from './examiningConfig/table'
import { spreadWaitProductionList } from '@/services/goods'
import { leListQuery } from '@/utils/utils'

export default class Examining extends Component {

  constructor(props) {
    super()
    this.store = props
  }

  onMountLeList = (leList)=>{
    this.leList = leList
  }
  
  render () {
    const config = {
      filterConfig,
      operationConfig,
      tableConfig,
      ...leListQuery(spreadWaitProductionList)
    }
    return (
      <LeList {...config} onMount={this.onMountLeList}/>
    )
  }
}
