import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig } from './config';
import mockList from './mock/list'

class PreviewColumnsDemo extends Component {
  constructor(props) {
    super(props);
    const list = mockList(1, 20).dataList
    this.state = {
      listConf: {
        filterConfig,
        operationConfig,
        tableConfig,
        dataSource: list
      }
    };
  }

  render() {
    const { listConf } = this.state;
    return <LeList {...listConf} />;
  }
}

export default PreviewColumnsDemo;
