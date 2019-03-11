import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import filterConfig from './config/a_search';
import operationConfig from './config/a_header';
import tableConfig from './config/a_table';
import { queryProductSpreadIngList } from '@/services/goods';
import { leListQuery } from '@/utils/utils';

export default class Auditing extends Component {
  constructor(props) {
    super();
    this.store = props;
  }

  render() {
    const config = {
      filterConfig,
      operationConfig,
      tableConfig,
      ...leListQuery(queryProductSpreadIngList),
    };
    return <LeList {...config} />;
  }
}
