import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './noscheduledConfig/search'
import operationConfig from './noscheduledConfig/operation'
import tableConfig from './noscheduledConfig/table'
import { queryUnScheduleProductList } from '@/services/goods'
import { leListQuery } from '@/utils/utils'

class Noscheduled extends Component {

  constructor(props) {
    super()
    this.store = props
  }
  
  render () {
    const config = {
      filterConfig,
      operationConfig,
      tableConfig,
      ...leListQuery(queryUnScheduleProductList)
    }
    return <LeList {...config} />
  }
}

export default Noscheduled
