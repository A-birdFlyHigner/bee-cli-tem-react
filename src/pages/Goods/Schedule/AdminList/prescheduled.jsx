import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './prescheduledConfig/search'
import operationConfig from './prescheduledConfig/operation'
import tableConfig from './prescheduledConfig/table'
import { queryPreScheduleProductList } from '@/services/goods'
import { leListQuery } from '@/utils/utils'

class Prescheduled extends Component {

  constructor(props) {
    super()
    this.store = props
  }
  
  render () {
    const config = {
      filterConfig,
      operationConfig,
      tableConfig,
      ...leListQuery(queryPreScheduleProductList)
    }
    return <LeList {...config} />
    
  }
}

export default Prescheduled
