import React, { Component } from 'react'
import { Table } from 'antd'
/* eslint-disable */

export default class StoreInfo extends Component {
  constructor(props) {
    super(props)
    const { saleUnits = []} = this.props
    this.state = {
      columns: [{
        title: 'SKU id',
        dataIndex: 'skuId',
        key: 'skuId',
        align: 'center'
      }, {
        title: 'SKU规格',
        dataIndex: 'propertyPairList',
        key: 'propertyPairList',
        align: 'center',
        render: (text, record) => {
          const { saleStatus } = record
          const StopSale = <span className='globalRed'>（停售）</span>
          return (
            <div>
              { saleStatus !== 0 ? null : StopSale}
              <span>{text.join('&')}</span>
            </div>
          )
        }
      },  {
        title: '推广库存',
        dataIndex: 'spreadStock',
        key: 'spreadStock',
        align: 'center',
      },  {
        title: '可售库存',
        dataIndex: 'availStock',
        key: 'availStock',
        align: 'center'
      }, {
        title: '待发货占用',
        dataIndex: 'notDeliverLockStock',
        key: 'notDeliverLockStock',
        align: 'center'
      }, {
        title: '待付款占用',
        dataIndex: 'notPayLockStock',
        key: 'notPayLockStock',
        align: 'center'
      }, ],
      saleUnits,
    }
  }

  render () {
    const { saleUnits, columns } = this.state;
    return (
      <div style={{margin: '20px 0'}}>
        <Table 
          dataSource={saleUnits} 
          columns={columns} 
          pagination={false}
        />
      </div>
    )
  }
}

