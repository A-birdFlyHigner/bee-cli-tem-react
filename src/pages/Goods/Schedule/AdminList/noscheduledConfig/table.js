import React from 'react'
import { goadminRevoke } from '../../../common/commonConfig'
import tableConfig from '../../common/table.config'
import commonMessage from '@/static/commonMessage'
import * as Sty from '../index.less'

const { reviewStatus } = commonMessage

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
    dataIndex: 'status',
    key: 'status',
    align: 'center',  
    width: 600,       
    render: (value, record) => {
      return (
        <div className={Sty.store}>
          {
            record.status !== 2 ? 
              <span>{reviewStatus[record.status]}</span>
            :
              <div>
                <span>已拒绝</span><br />
                <span>原因：{reviewStatus[record.status]}</span><br />
              </div>
          }
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
