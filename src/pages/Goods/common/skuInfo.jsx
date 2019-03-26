import React, { Component } from 'react'
import { Table } from 'antd'
/* eslint-disable */

export default class SkuInfo extends Component {
  constructor(props) {
    super(props)
    const { saleUnitsInfo } = this.props

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
        title: '市场价',
        dataIndex: 'marketPrice',
        key: 'marketPrice',
        align: 'center'
      },  {
        title: '会员价',
        dataIndex: 'memberPrice',
        key: 'memberPrice',
        align: 'center'
      },  {
        title: '非会员价',
        dataIndex: 'nonmemberPrice',
        key: 'nonmemberPrice',
        align: 'center'
      }, {
        title: '成本价',
        dataIndex: 'costPrice',
        key: 'costPrice',
        align: 'center'
      }, {
        title: '毛利',
        dataIndex: 'grossProfit',
        key: 'grossProfit',
        align: 'center'
      }, ],
      saleUnitsInfo,
    }

  }

  render () {
    const { saleUnitsInfo, columns } = this.state
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

