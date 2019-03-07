import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './scheduledConfig/search'
import operationConfig from './scheduledConfig/header'
import tableConfig from './scheduledConfig/table'
import { queryCommunityManager } from '@/services/goods'
import { leListQuery } from '@/utils/utils'

export default class Scheduled extends Component {

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
