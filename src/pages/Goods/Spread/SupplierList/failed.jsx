import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import filterConfig from './config/f_search';
import tableConfig from './config/f_table';
import { queryProductSpreadFailureList } from '@/services/goods';
import { leListQuery } from '@/utils/utils';

export default class Failed extends Component {
  constructor(props) {
    super();
    this.store = props;
  }

  render() {
    const config = {
      filterConfig,
      tableConfig,
      ...leListQuery(queryProductSpreadFailureList),
    };
    return <LeList {...config} />;
  }
}
