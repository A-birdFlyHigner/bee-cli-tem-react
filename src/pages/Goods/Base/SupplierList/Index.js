import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig } from './config';
import { queryGoodsList } from '@/services/goods'
import { leListQuery } from '@/utils/utils'

class GoodsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listConfig: {
        filterConfig,
        operationConfig,
        tableConfig,
        ...leListQuery(queryGoodsList)
      }
    };
  }

  render() {
    const { listConfig } = this.state;
    return <LeList {...listConfig} />
  }
}

export default GoodsList;
