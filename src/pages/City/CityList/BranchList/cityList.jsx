import React, { Component } from 'react'
import '@lib/lepage/lib/index.css'
import { LeList } from '@lib/lepage'
import filterConfig from './cityListConfig/search'
import tableConfig from './cityListConfig/table'
import { queryBranchCityManager } from '@/services/city'
// TODO: 需要更改一下 queryCommunityManager 接口
import { queryCommunityManager } from '@/services/goods'
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
      ...leListQuery(queryCommunityManager)
    }
    return (
      <LeList {...config}></LeList>
    )
  }
}
