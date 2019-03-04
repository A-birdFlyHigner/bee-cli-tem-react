import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig } from './config';
import './index.less';
import mockList from './mock/list'

const listrConfig = {
  filterConfig,
  operationConfig,
  tableConfig,
  formatBefore(queryParams) {
    return queryParams.json
  },
  query(queryParams, url, method) {
    return new Promise((resolve, reject) => {
      const result = mockList(queryParams)
      setTimeout(() => {
        resolve(result)
      }, 300)
    })
  },
  formatAfter(result) {
    return result
  },
  url: 'http://localhost:8899/getList',
};

class ExampleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listrConfig
    };
  }

  render() {
    const { state } = this
    return <LeList {...state.listrConfig} />;
  }
}

export default ExampleDemo;
