import React, { Component } from 'react'
import { Table } from 'antd'
/* eslint-disable */

export default class StoreInfo extends Component {
  constructor(props) {
    super(props)
    const { saleUnitsInfo = []} = this.props
    this.state = {
      columns: [{
        title: 'SKU id',
        dataIndex: 'skuId',
        key: 'skuId',
        align: 'center'
      }, {
        title: 'sku码(发货编码)',
        dataIndex: 'deliverCode',
        key: 'deliverCode',
        align: 'center',
      }, {
        title: 'SKU规格',
        dataIndex: 'propertyPairList',
        key: 'propertyPairList',
        align: 'center',
        render: (text, record) => {
          const { status } = record
          const skuName = []

          text.forEach(item => {
            skuName.push(item.pvName)
          })

          const StopSale = <span className='globalRed'>（停售）</span>
          return (
            <div>
              { status !== 0 ? null : StopSale}
              <span>{skuName.join('-')}</span>
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
      saleUnitsInfo,
    }
  }

  render () {
    const { saleUnitsInfo, columns } = this.state;
    return (
      <div style={{margin: '20px 0', height: '500px', overflow: 'auto'}}>
        <Table 
          dataSource={saleUnitsInfo} 
          columns={columns} 
          pagination={false}
        />
      </div>
    )
  }
}

