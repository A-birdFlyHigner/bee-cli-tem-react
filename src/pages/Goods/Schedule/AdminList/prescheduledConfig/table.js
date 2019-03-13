import React from 'react'
import router from 'umi/router'
import * as Sty from '../index.less'
import tableConfig from '../../common/table.config'
import commonMessage from '@/static/commonMessage'

const { reviewStatus } = commonMessage

// 进入审核详情
const goExamineDetail = (id) => {
  router.push({
    pathname: `/goods/schedule/adminExaminedetail/${id}`,
  })
}

export default {
  rowKey: 'saleGoodsId',
  scroll: { x: 2000 },
  rowSelection: {
    selections: true,
    getCheckboxProps() {
      return {};
    },
  },
  columns: [
    ...tableConfig,
  {
    title: '审核状态',
    dataIndex: 'status',
    key: 'status',
    width: 200,                                                           
    align: 'center',                      
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
          <a onClick={()=> goExamineDetail(record.saleGoodsId)}>审核</a>
        </div>
      )
    }
  }]
}
