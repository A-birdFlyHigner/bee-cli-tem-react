import React, { Component } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
/* eslint-disable */ 
export default class SkuDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
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
      dataSource: []
    }

  }

  static propTypes = {
    saleUnitsInfo: PropTypes.array,
  }
  componentWillMount () {
    const { saleUnitsInfo } = this.props
    setTimeout(() => {
      this.setState({
        loading: false,
        dataSource: saleUnitsInfo
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

