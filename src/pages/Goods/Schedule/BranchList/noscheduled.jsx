import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './noscheduledConfig/search'
import operationConfig from './noscheduledConfig/operation'
import tableConfig from './noscheduledConfig/table'
import { queryCommunityManager } from '@/services/goods'
import { leListQuery } from '@/utils/utils'

export default class Noscheduled extends Component {

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