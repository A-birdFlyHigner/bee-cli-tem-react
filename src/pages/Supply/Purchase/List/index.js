import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig } from './config';
import './index.less';
// import mockList from './mock/list';
import {purchaseList} from '@/services/supply'
import {leListQuery} from '@/utils/utils'

const listConfig = {
  filterConfig,
  operationConfig,
  tableConfig,
  ...leListQuery(purchaseList)
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listConfig,
    };
  }

  render() {
    const { state } = this;
    return <LeList {...state.listConfig} />;
  }
}

export default List;
