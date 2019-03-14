import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, tableConfig } from './config';
import './index.less';
import {getExportDeliveryList, exportDelivery, getWarehouseEmunList} from '@/services/supply'
import {leListQuery} from '@/utils/utils'


const listConfig = {
  filterConfig,
  tableConfig,
  ...leListQuery(getExportDeliveryList)
}

class ExampleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listConfig,
    };
  }
  componentDidMount() {
    const self = this
    /*getWarehouseEmunList().then((res)=>{
      const data = res.map(item=>{
        return {value: item.key, label: item.value}
      })
      self.list.filterCore.setProps('warehouseCode', { options: data });
    })*/
  }
  render() {
    const { state } = this;
    return <LeList {...state.listConfig} ref={list => this.list = list} />;
  }
}

export default ExampleDemo;
