import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, tableConfig } from './config';
import './Index.less';
import {getExportDeliveryList, getWarehouseEmunList} from '@/services/supply'
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

  handleLeMount = (leList, {filterLeForm}) => {
    if (ADMIN_TYPE !== 'SUPPLIER') {
      getWarehouseEmunList().then((res) => {
        const data = res && res.map(item => {
          return { value: item.key, label: item.value };
        });
        filterLeForm.setProps('warehouseCode', { options: data });
      });
    }
  }

  render() {
    const { state } = this;
    return <LeList {...state.listConfig} onMount={this.handleLeMount} />
  }
}

export default ExampleDemo;
