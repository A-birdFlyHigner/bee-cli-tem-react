import React from 'react'
import router from 'umi/router'
import * as Sty from '../index.less'
import tableConfig from '../../common/table.config'
import commonMessage from '@/static/commonMessage'

const { adminreviewStatus } = commonMessage

// 进入审核详情
const goExamineDetail = (id) => {
  router.push({
    pathname: `/goods/schedule/adminExaminedetail/${id}`,
    query: {
      tabType: '3'
    }
  })
}

export default {
  rowKey: 'saleGoodsId',
  scroll: { x: 2200 },
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
    dataIndex: 'reviewStatus',
    key: 'reviewStatus',
    width: 400,                                                                                 
    render: (value, record) => {
      return (
        <div className={Sty.store}>
          {
            record.reviewStatus !== 3 ? 
              <span>{adminreviewStatus[record.reviewStatus]}</span>
            :
              <div>
                <span>已拒绝</span><br />
                <span>原因：{record.reviewReason}</span><br />
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
          {
            record.reviewStatus === 3 
            ? 
              <div>-</div>
            :
              <a onClick={()=> goExamineDetail(record.saleGoodsId)}>审核</a>
          }
        </div>
      )
    }
  }]
}
