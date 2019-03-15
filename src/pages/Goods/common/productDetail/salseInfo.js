import React from 'react'
import { Table } from 'antd'

const tabelColumns = () => {
  return [{
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 120,
    render: () => {
      return '可用'
    }
  }, {
    title: 'sku组合',
    dataIndex: 'propertyPairList',
    align: 'center',
    width: 220,
    render: (val) => {
      const list = val.map(p => p.pvName)
      return <span>{list.join('-') || '默认'}</span>
    }
  }, {
    title: 'sku编码（发货编码）',
    dataIndex: 'deliverCode',
    align: 'center',
    width: 220,
  }, {
    title: '成本价',
    dataIndex: 'costPrice',
    align: 'center',
    width: 120,
  }, {
    title: '限购数量',
    dataIndex: 'restriction',
    align: 'center',
    width: 120,
  }, ]
}

export default [{
  label: '销售属性',
  className: 'box-header',
}, {
  name: 'saleUnits',
  component: 'Item',
  render (values) {
    return (
      <Table 
        rowKey='skuId' 
        columns={tabelColumns()} 
        pagination={false}
        dataSource={values.saleUnits} 
      />
    )
  }
}, ]