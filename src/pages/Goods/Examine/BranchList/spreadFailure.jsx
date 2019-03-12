import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './spreadFailureConfig/search'
import tableConfig from './spreadFailureConfig/table'
import { spreadFailureProductionList } from '@/services/goods'
import { leListQuery } from '@/utils/utils'
/* eslint-disable */ 
export default class SpreadFailure extends Component {

  constructor(props) {
    super()
    this.store = props
  }
  
  render () {
    const config = {
      filterConfig,
      operationConfig:{},
      tableConfig,
      ...leListQuery(spreadFailureProductionList)
    }
    return (
      <LeList {...config} />
    )
  }
}
