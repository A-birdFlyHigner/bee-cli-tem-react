import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig } from './config';
import './index.less';
import {getPurchaseDetail, getPurchaseDetailList} from '@/services/supply'
import {leListQuery} from '@/utils/utils'
import moment from 'moment';

class PurchaseEdit extends Component {
  constructor(props) {
    super(props);
    this.listDataSource = {}
    let self = this
    this.purchaseCode  = self.props.location.query.purchaseNo

    const operationConfigMix = {...operationConfig}
    operationConfigMix.items[0].props.onChange = (value) => {
      // debugger
      self.list.operationCore.setValue('differStatus', value)
      self.list.filterCore.setValue('differStatus', value ? 1: 0)
      self.list.listCore.fetch()
      // debugger
    }
    const listConfig = {
      filterConfig: filterConfig({
        purchaseNo: this.purchaseCode,
        differStatus: 0,
      }),
      operationConfig: operationConfigMix,
      tableConfig,
      ...leListQuery(getPurchaseDetailList),
    }
    this.state = {
      listConfig,
      modalVisible: false,
    };
  }

  componentDidMount() {
    getPurchaseDetail(this.purchaseCode).then(({supplierName, warehouseName, expectInboundTime, loseEfficacyTime})=>{
      this.list.filterCore.setValues({
        warehouseName,
        supplierName,
        expectInputTime: expectInboundTime && moment(expectInboundTime),
        invalidTime: loseEfficacyTime && moment(loseEfficacyTime),
        purchaseCode: this.purchaseCode,
        differStatus: 0,
      })
    })
  }

  render() {
    const { state } = this;
    return (
      <div>
        <LeList {...state.listConfig} ref={list => this.list = list}/>
      </div>
    );
  }
}

export default PurchaseEdit;
