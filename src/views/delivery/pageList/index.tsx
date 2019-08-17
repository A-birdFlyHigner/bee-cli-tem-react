import React, { Component } from 'react'
import { LeList } from '@lib/lepage'
import { filterConfig, operationConfig, tableConfig } from './config/index'
console.log(filterConfig, operationConfig, tableConfig)
const config = {
  filterConfig,
  operationConfig,
  tableConfig
  // dataSource: list
}
export default class PageListView extends Component {
  render() {
    return (
      <div>
        <span></span>
        <LeList {...config}></LeList>
      </div>
    )
  }
}
