import React from 'react'
import { Table } from 'antd'

const tabelColumns = () => {
  return [{
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 120,
    render: (value, row, index) => {
      return '可用'
    }
  }, {
    title: 'sku组合',
    dataIndex: 'sku',
    align: 'center',
    width: 220,
  }, {
    title: 'sku编码（发货编码）',
    dataIndex: 'skuCode',
    align: 'center',
    width: 220,
  }, {
    title: '成本价',
    dataIndex: 'price',
    align: 'center',
    width: 120,
  }, {
    title: '限购数量',
    dataIndex: 'stock',
    align: 'center',
    width: 120,
  }, ]
}

export default [{
  label: '销售属性',
  className: 'box-header',
}, {
  name: 'salseData',
  component: 'Item',
  render (values) {
    return (
      <Table 
        rowKey='sku' 
        columns={tabelColumns()} 
        pagination={false}
        dataSource={values.salseData} 
      />
    )
  }
}, ]