import React from 'react'
import router from 'umi/router'
import tableConfig from '../../common/table.config'
import { goadminBack } from '../../../common/commonConfig'

// 进入商品详情
const goBaseDetail = (id) => {
  router.push({
    pathname: `/goods/schedule/adminProductdetail/${id}`,
  })
}

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
    render: (text, record, index, {leList}) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={()=> goadminBack(record.saleGoodsId, leList)}>强制回退</a>
          <span />
          <a onClick={()=> goBaseDetail(record.saleGoodsId)}>查看</a>
        </div>
      )
    }
  }]
}
