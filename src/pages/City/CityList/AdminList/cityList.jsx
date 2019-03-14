import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './cityListConfig/search'
import tableConfig from './cityListConfig/table'
import { queryAdminCityManager } from '@/services/city'
import { leListQuery } from '@/utils/utils'

export default class AdminCityList extends Component {

  constructor(props) {
    super()
    this.store = props
  }
  
  render () {
    const config = {
      filterConfig,
      operationConfig:{},
      tableConfig,
      ...leListQuery(queryAdminCityManager)
    }
    return (
      <LeList {...config} />
    )
  }
}
