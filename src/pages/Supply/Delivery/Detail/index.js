import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig } from './config';
import './index.less';
import { getDeliveryDetail, getDeliveryDetailList } from '@/services/supply';
import { leListQuery } from '@/utils/utils';
import moment from 'moment';

class PurchaseEdit extends Component {
  constructor(props) {
    super(props);
    this.listDataSource = {};
    let self = this;
    this.deliveryNo = self.props.location.query.deliveryNo;

    const operationConfigMix = { ...operationConfig };
    operationConfigMix.items[0].props.onChange = (value) => {
      // debugger
      self.list.operationCore.setValue('differStatus', value);
      self.list.filterCore.setValue('differStatus', value ? 1 : 0);
      self.list.listCore.fetch();
      // debugger
    };
    const listConfig = {
      filterConfig: filterConfig({
        deliveryNo: this.deliveryNo,
        differStatus: 0,
      }),
      operationConfig: operationConfigMix,
      tableConfig,
      ...leListQuery(getDeliveryDetailList),
    };
    this.state = {
      listConfig,
      modalVisible: false,
    };
  }

  componentDidMount() {
    getDeliveryDetail(this.deliveryNo).then(({
       deliveryNo, createTime, warehouseName, deliveryType,
       communityName, consigneeName, consigneeMobile, communityAddress,
     }) => {
      // debugger
      this.list.filterCore.setValues({
        deliveryNo: this.deliveryNo,
        // createTime: createTime && moment(createTime),
        warehouseName,
        // deliveryType: deliveryType === 0 ? '入仓' : '落地配',
        communityName,
        consigneeName,
        consigneeMobile,
        communityAddress,
      });
    });
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
