import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig } from './config';
import { getLocalDeliveryList } from '@/services/supply/admin'
import { leListQuery } from '@/utils/utils'

class GoodsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listConfig: {
        filterConfig,
        operationConfig,
        tableConfig,
        ...leListQuery(getLocalDeliveryList)
      }
    };
  }

  render() {
    const { listConfig } = this.state;
    return (
      <div className='base-goods-list'>
        <LeList {...listConfig} />
      </div>
    )
  }
}

export default GoodsList;
