import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, filterConfigSupply, operationConfig, tableConfig } from './config';
import './index.less';
import {getPurchaseList, getWarehouseEmunList} from '@/services/supply'
import {leListQuery} from '@/utils/utils'

let listConfig = {
  filterConfig,
  operationConfig,
  tableConfig,
  ...leListQuery(getPurchaseList)
};
if (ADMIN_TYPE === 'BRANCH') {
  listConfig = {
    filterConfig,
    operationConfig,
    tableConfig,
    ...leListQuery(getPurchaseList),
  };
} else if (ADMIN_TYPE === 'SUPPLIER') {
  listConfig = {
    filterConfig: filterConfigSupply,
    tableConfig,
    ...leListQuery(getPurchaseList),
  };
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listConfig,
    }
  }

  componentDidMount() {
    const self = this;
    if (ADMIN_TYPE !== 'SUPPLIER') {
      getWarehouseEmunList().then((res) => {
        const data = res && res.map(item => {
          return { value: item.key, label: item.value };
        });
        self.list.filterCore.setProps('warehouseCode', { options: data });
      });
    }
  }

  render() {
    const { state } = this;
    return <LeList {...state.listConfig} ref={list => this.list = list} />;
  }
}

export default List;
