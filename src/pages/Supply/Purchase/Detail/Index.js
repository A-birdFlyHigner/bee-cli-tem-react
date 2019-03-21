import React, { Component } from 'react';
import { LeList } from '@lib/lepage';
import moment from 'moment'
import { filterConfig, operationConfig, tableConfig } from './config';
import './Index.less'
import {getPurchaseDetail, getPurchaseDetailList} from '@/services/supply'
import {leListQuery} from '@/utils/utils'

const formatType = 'YYYY-MM-DD'
const formatType1 = 'YYYY-MM-DD HH:mm:ss'

class PurchaseEdit extends Component {
  constructor(props) {
    super(props);
    this.listDataSource = {}
    const self = this
    this.purchaseNo = self.props.location.query.purchaseNo
    this.differStatus = Number(self.props.location.query.differStatus) || 0

    const operationConfigMix = { ...operationConfig}
    const listConfig = {
      filterConfig: filterConfig({
        purchaseNo: this.purchaseNo,
        differStatus: self.differStatus,
      }),
      operationConfig: operationConfigMix,
      tableConfig,
      ...leListQuery(getPurchaseDetailList),
    }
    this.state = {
      listConfig,
    };
  }

  handleLeMount = (leList, {filterLeForm, operationLeForm}) => {
    console.log('leList, filterLeform, operationLeform', leList, filterLeForm, operationLeForm)
    operationLeForm.setValue('differStatus', this.differStatus === 1)
    getPurchaseDetail(this.purchaseNo).then((
      {supplierName, warehouseName, expectInboundTime, loseEfficacyTime, source, status, createTime }
      ) => {
      let statusStr = ''
      switch (status) {
        case 0:
          statusStr = '待提交'
          break
        case 1:
          statusStr = '入库完成'
          break
        case 2:
          statusStr = '未入库'
          break
        case 3:
          statusStr = '部分入库'
          break
        case 4:
          statusStr = '已取消'
          break
        default:
          break
      }
      filterLeForm.setValues({
        warehouseName,
        supplierName,
        expectInboundTime: expectInboundTime && moment(expectInboundTime).format(formatType),
        loseEfficacyTime: loseEfficacyTime && moment(loseEfficacyTime).format(formatType),
        createTime: createTime && moment(createTime).format(formatType1),
        purchaseNo: this.purchaseNo,
        differStatus: this.differStatus,
        source: source === 0 ? '人工创建' : '系统生成',
        status: statusStr,
      })
    })
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
