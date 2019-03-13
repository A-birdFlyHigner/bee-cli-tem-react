import React from 'react'
import tableConfig from '../../common/table.config'
import { goadminBack } from '../../../common/commonConfig'

export default {
  rowKey: 'saleGoodsId',
  scroll: { x: 1800 },
  rowSelection: {
    selections: true,
    getCheckboxProps() {
      return {};
    },
  },
  columns: [
    ...tableConfig,
    {
    title: '操作',
    width: 140,
    align: 'center',    
    fixed: 'right',
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={()=> goadminBack(record.saleGoodsId)}>强制回退</a>
        </div>
      )
    }
  }]
}
