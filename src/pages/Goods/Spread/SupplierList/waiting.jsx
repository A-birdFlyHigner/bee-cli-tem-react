import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import filterConfig from './config/w_search';
import operationConfig from './config/w_header';
import tableConfig from './config/w_table';
import { queryCommunityManager } from '@/services/goods';
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
      ...leListQuery(queryCommunityManager),
    };
    return <LeList {...config} />;
  }
}
