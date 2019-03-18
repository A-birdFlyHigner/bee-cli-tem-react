import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import { filterConfig, operationConfig, tableConfig } from './config';
import './index.less';
import { getDeliveryDetail, getDeliveryDetailList } from '@/services/supply';
import { leListQuery } from '@/utils/utils';

class PurchaseEdit extends Component {
  constructor(props) {
    super(props);
    this.listDataSource = {};
    const self = this;
    self.deliveryNo = self.props.location.query.deliveryNo
    self.differStatus = Number(self.props.location.query.differStatus) || 0

    const operationConfigMix = { ...operationConfig };
    operationConfigMix.items[0].props.onChange = (value) => {
      self.list.operationCore.setValue('differStatus', value);
      self.list.filterCore.setValue('differStatus', value ? 1 : 0);
      self.list.listCore.fetch();
    };
    const listConfig = {
      filterConfig: filterConfig({
        deliveryNo: self.deliveryNo,
        differStatus: self.differStatus,
      }),
      operationConfig: operationConfigMix,
      tableConfig,
      ...leListQuery(getDeliveryDetailList),
    };
    this.state = {
      listConfig,
    };
  }

  componentDidMount() {
    this.list.operationCore.setValue('differStatus', this.differStatus === 1)
    getDeliveryDetail(this.deliveryNo).then(({
       createTime, warehouseName, deliveryType,
       communityName, consigneeName, consigneeMobile, communityAddress,
     }) => {
      // debugger
      this.list.filterCore.setValues({
        deliveryNo: this.deliveryNo,
        // createTime: createTime && moment(createTime),
        warehouseName,
        deliveryType: deliveryType === 0 ? '入仓' : '落地配',
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
