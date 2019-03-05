import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import filterConfig from './config/a_search';
import headerConfig from './config/a_header';
import tableConfig from './config/a_table';
import { queryCommunityManager } from '@/services/goods';
import { leListQuery } from '@/utils/utils';

export default class Auditing extends Component {
  constructor(props) {
    super();
    this.store = props;
  }

  render() {
    const config = {
      filterConfig,
      headerConfig,
      tableConfig,
      ...leListQuery(queryCommunityManager),
    };
    return <LeList {...config} />;
  }
}
