import React from 'react'
import { goadminRevoke } from '../../../common/commonConfig'
import tableConfig from '../../common/table.config'
import * as Sty from '../index.less'

export default {
  rowKey: 'id',
  scroll: { x: 1800 },
  rowSelection: {
    selections: true,
    getCheckboxProps() {
      return {};
    },
  },
  columns: [
    ...tableConfig,  {
    title: '审核状态',
    dataIndex: 'examineStatus',
    key: 'examineStatus',
    align: 'center',  
    width: 600,       
    render: () => {
      return (
        <div className={Sty.store}>
          <span>已拒绝</span><br />
          <span>原因：不符合规则</span><br />
        </div>
      )
    }
  }, {
    title: '操作',
    width: 100,
    align: 'center', 
    fixed: 'right',  
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={()=> goadminRevoke(record.saleGoodsId)}>撤销推广</a>
        </div>
      )
    }
  }]
}
