import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import filterConfig from './scheduleConfig/filter';
import operationConfig from './scheduleConfig/operation';
import tableConfig from './scheduleConfig/table';
import { listScheduledProduct } from '@/services/goods';
import { leListQuery } from '@/utils/utils';

export default class Wating extends Component {
  constructor(props) {
    super();
    this.store = props;
  }

  render() {
    const config = {
      filterConfig,
      operationConfig,
      tableConfig,
      ...leListQuery(listScheduledProduct),
    };
    return <LeList {...config} />;
  }
}
