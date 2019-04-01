import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import filterConfig from './noScheduleConfig/filter';
import operationConfig from './noScheduleConfig/operation';
import tableConfig from './noScheduleConfig/table';
import { listUnScheduledProduct } from '@/services/goods';
import { leListQuery } from '@/utils/utils';

export default class Wating extends Component {
  constructor(props) {
    super();
    this.store = props;
  }

  onListMount = (leList) => {
    this.leList = leList
  }

  render() {
    const config = {
      filterConfig,
      operationConfig,
      tableConfig,
      ...leListQuery(listUnScheduledProduct),
    };
    return <LeList onMount={this.onListMount} {...config} />;
  }
}
