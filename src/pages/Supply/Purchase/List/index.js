import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig } from './config';
import './index.less';
import {getPurchaseList, getWarehouseEmunList} from '@/services/supply'
import {leListQuery} from '@/utils/utils'

const listConfig = {
  filterConfig,
  operationConfig,
  tableConfig,
  ...leListQuery(getPurchaseList)
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listConfig,
    }
  }

  componentDidMount() {
    const self = this
    getWarehouseEmunList().then((res)=>{
      const data = res && res.map(item=>{
        return {value: item.key, label: item.value}
      })
      self.list.filterCore.setProps('warehouseCode', { options: data });
    })
  }

  render() {
    const { state } = this;
    return <LeList {...state.listConfig} ref={list => this.list = list} />;
  }
}

export default List;
