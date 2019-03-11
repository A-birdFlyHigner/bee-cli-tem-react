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
        dataIndex: 'skuId',
        key: 'skuId',
        align: 'center'
      }, {
        title: 'SKU规格',
        dataIndex: 'propertyPairList',
        key: 'propertyPairList',
        align: 'center',
        render: propertyPairList => (
          <div>
            <span className="globalRed">(停售)</span>
            <span>{propertyPairList}</span>
          </div>
        )
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
      dataSource: []
    }
  }

  static propTypes = {
    saleUnitsInfo: PropTypes.array,
  }
  componentWillMount () {
    const { saleUnitsInfo } = this.props
  
    this.setState({
      loading: false,
      dataSource: saleUnitsInfo
    })
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

