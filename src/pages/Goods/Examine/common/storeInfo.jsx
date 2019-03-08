import React, { Component } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
/* eslint-disable */ 
export default class SkuDetail extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      columns: [{
        title: 'SKU id',
        dataIndex: 'key',
        key: 'key',
        align: 'center'
      }, {
        title: 'SKU规格',
        dataIndex: 'skuInfo',
        key: 'skuInfo',
        align: 'center',
        render: skuInfo => (
          <div>
            <span className="globalRed">(停售)</span>
            <span>{skuInfo}</span>
          </div>
        )
      },  {
        title: '推广库存',
        dataIndex: 'extensionStore',
        key: 'extensionStore',
        align: 'center',
      },  {
        title: '活动库存(锁定)',
        dataIndex: 'activeStore',
        key: 'activeStore',
        align: 'center'
      },  {
        title: '可售库存',
        dataIndex: 'cansaleStore',
        key: 'cansaleStore',
        align: 'center'
      }, {
        title: '待发货占用',
        dataIndex: 'presend',
        key: 'presend',
        align: 'center'
      }, {
        title: '待付款占用',
        dataIndex: 'prepay',
        key: 'prepay',
        align: 'center'
      }, ],
      dataSource: []
    }
  }

  static propTypes = {
    productId: PropTypes.number,
  }
  componentWillMount () {
    setTimeout(() => {
      this.setState({
        loading: false,
        dataSource: [{
          key: '1',
          name: '胡彦斌',
          skuInfo: '西湖1号',
          extensionStore: '100',
          activeStore: '80',
          cansaleStore: '20',
          presend: '10',
          prepay: '11',          
        }, {
          key: '2',
          name: '胡彦祖',
          skuInfo: '西湖1号',
          extensionStore: '100',
          activeStore: '80',
          cansaleStore: '20',
          presend: '10',
          prepay: '11', 
        }]
      })
    }, 1000)
  }
  componentWillUnmount () {
    this.setState = () => {
      return null
    }
  }

  render () {
    const {loading, dataSource, columns} = this.state
    return (
      <div style={{margin: '20px 0'}}>
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          pagination={false}
          loading={loading} 
        />
      </div>
    )
  }
}

