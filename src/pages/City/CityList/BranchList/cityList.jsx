import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './cityListConfig/search'
import tableConfig from './cityListConfig/table'
import { queryBranchCityManager } from '@/services/city'
import { leListQuery } from '@/utils/utils'

export default class BranchCityList extends Component {

  constructor(props) {
    super()
    this.store = props
  }
  
  render () {
    const config = {
      filterConfig,
      operationConfig:{},
      tableConfig,
      ...leListQuery(queryBranchCityManager)
    }
    return (
      <LeList {...config}></LeList>
    )
  }
}
