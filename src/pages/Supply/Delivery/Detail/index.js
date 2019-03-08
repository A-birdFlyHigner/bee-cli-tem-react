import React, { Component } from 'react';
import { LeForm, LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig } from './config';
import './index.less';
import mockList from './mock/list';
import { Checkbox } from 'antd';
import formConfig from '../Detail/config/form.config';

const listConfig = {
  // filterConfig,
  // operationConfig,
  tableConfig,
  formatBefore(queryParams) {
    return queryParams;
  },
  query(queryParams, url, method) {
    return new Promise((resolve, reject) => {
      const result = mockList(queryParams);
      setTimeout(() => {
        resolve(result);
      }, 300);
    });
  },
  formatAfter(result) {
    return result;
  },
  url: 'http://localhost:8899/getList',
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listConfig,
      formConfig,
    };
  }

  render() {
    const { state } = this;
    return (
      <div>
        <h4>基本信息</h4>
        <LeForm {...state.formConfig} />
        <h4>商品信息</h4>
        <Checkbox onChange={this.onChange}>仅查看差异商品</Checkbox>
        <LeList {...state.listConfig} />
      </div>
    );
  }
}
export default List;
