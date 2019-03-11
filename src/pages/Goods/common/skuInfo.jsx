import React, { Component } from 'react'
import { Table } from 'antd'
/* eslint-disable */

export default class SkuInfo extends Component {
  constructor(props) {
    super(props)
    const { saleUnitsInfo = []} = this.props

    this.state = {
      columns: [{
        title: 'SKU id',
        dataIndex: 'skuId',
        key: 'skuId',
        align: 'center'
      },  {
        title: 'SKU规格',
        dataIndex: 'propertyPairList',
        key: 'propertyPairList',
        align: 'center'
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
      <div style={{margin: '20px 0'}}>
        <Table 
          dataSource={saleUnitsInfo} 
          columns={columns} 
          pagination={false}
        />
      </div>
    )
  }
}

