import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './prescheduledConfig/search'
import operationConfig from './prescheduledConfig/operation'
import tableConfig from './prescheduledConfig/table'
import { queryCommunityManager } from '@/services/goods'
import { leListQuery } from '@/utils/utils'

export default class Prescheduled extends Component {

  constructor(props) {
    super()
    this.store = props
  }
  
  render () {
    const config = {
      filterConfig,
      operationConfig,
      tableConfig,
      ...leListQuery(queryCommunityManager)
    }
    return (
      <LeList {...config}></LeList>
    )
  }
}
