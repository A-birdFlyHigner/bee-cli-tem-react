import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import moment from 'moment';
import { filterConfig, operationConfig, tableConfig } from './config';
import './Index.less';
import { getDeliveryDetail, getDeliveryDetailList, getWarehouseEmunList } from '@/services/supply';
import { leListQuery } from '@/utils/utils';

const formatType = 'YYYY-MM-DD'

class PurchaseEdit extends Component {
  constructor(props) {
    super(props);
    this.listDataSource = {};
    const self = this;
    self.deliveryNo = self.props.location.query.deliveryNo
    self.differStatus = Number(self.props.location.query.differStatus) || 0

    // const operationConfigMix = {...operationConfig()}
    const listConfig = {
      filterConfig: filterConfig({
        deliveryNo: self.deliveryNo,
        differStatus: self.differStatus,
      }),
      operationConfig: operationConfig,
      tableConfig,
      ...leListQuery(getDeliveryDetailList),
    };
    this.state = {
      listConfig,
    };
  }

  handleLeMount = (leList, {filterLeForm, operationLeForm}) => {
    if (ADMIN_TYPE !== 'SUPPLIER') {
      getWarehouseEmunList().then((res) => {
        const data = res && res.map(item => {
          return { value: item.key, label: item.value };
        });
        filterLeForm.setProps('warehouseCode', { options: data });
      });
    }
    operationLeForm.setValue('differStatus', this.differStatus === 1)
    getDeliveryDetail(this.deliveryNo).then((
      { warehouseName, expectOutboundTime, deliveryType, communityName, consigneeName, consigneeMobile, communityAddress, }) => {
      // debugger
      filterLeForm.setValues({
        deliveryNo: this.deliveryNo,
        expectOutboundTime: expectOutboundTime && moment(expectOutboundTime).format(formatType),
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
        <LeList {...state.listConfig} onMount={this.handleLeMount} />
      </div>
    );
  }
}

export default PurchaseEdit;
