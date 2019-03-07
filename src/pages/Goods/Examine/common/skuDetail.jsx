import React, { Component } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

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
      },  {
        title: 'SKU规格',
        dataIndex: 'address',
        key: 'address',
        align: 'center'
      },  {
        title: '市场价',
        dataIndex: 'marketPrice',
        key: 'marketPrice',
        align: 'center'
      },  {
        title: '会员价',
        dataIndex: 'vipPrice',
        key: 'vipPrice',
        align: 'center'
      },  {
        title: '非会员价',
        dataIndex: 'novipPrice',
        key: 'novipPrice',
        align: 'center'
      }, {
        title: '成本价',
        dataIndex: 'costPrice',
        key: 'costPrice',
        align: 'center'
      }, {
        title: '毛利',
        dataIndex: 'profit',
        key: 'profit',
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
          age: 32,
          address: '西湖区湖底公园1号',
          marketPrice: '13',
          vipPrice: '10',
          novipPrice: '12',          
          costPrice: 1,
          profit: '1'          
        }, {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
          marketPrice: '15',
          vipPrice: '13',
          novipPrice: '14',          
          costPrice: 8,
          profit: '6'
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
          loading={loading} />
      </div>
    )
  }
}

