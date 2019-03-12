import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import filterConfig from './noScheduleConfig/filter';
import tableConfig from './noScheduleConfig/table';
import { listUnScheduledProduct } from '@/services/goods';
import { leListQuery } from '@/utils/utils';

export default class Wating extends Component {
  constructor(props) {
    super();
    this.store = props;
  }

  render() {
    const config = {
      filterConfig,
      tableConfig,
      ...leListQuery(listUnScheduledProduct),
    };
    return <LeList {...config} />;
  }
}
