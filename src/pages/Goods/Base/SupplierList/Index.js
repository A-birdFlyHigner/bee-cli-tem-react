import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig } from './config';
import mockList from './mock/list'

class GoodsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listConfig: {
        filterConfig,
        operationConfig,
        tableConfig,
        // TODO: formatBefore、query、formatAfter 统一封装到 LeList
        formatBefore(queryParams) {
          return queryParams
        },
        query(queryParams, url, method) {
          return new Promise((resolve, reject) => {
            const result = mockList(queryParams)
            setTimeout(() => {
              resolve(result)
            }, 300)
          })
        },
        formatAfter(result) {
          return result
        },
        url: '/revision/product/gys/table/query'
      }
    };
  }

  render() {
    const { state } = this;
    return <LeList {...state.listConfig} />
  }
}

export default GoodsList;
