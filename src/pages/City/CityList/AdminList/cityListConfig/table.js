import React from 'react'
import * as Sty from '../index.less'
import router from 'umi/router'

// 查看详情
const goCityDetail = (record) => {
  router.push({
    pathname: '/goods/base/detail/:id',
  })
}

export default {
  rowKey: 'id',
  scroll: { x: 1500 },
  columns: [{
    title: '城市id',
    dataIndex: 'cityCode',
    key: 'cityCode',
    singleLine: true,
  }, {
    title: '城市',
    dataIndex: 'cityName',
    key: 'cityName',
    singleLine: true,
  }, {
    title: '所属省份',
    dataIndex: 'province',
    key: 'province',
    singleLine: true,
  }, {
    title: '开抢时间',
    dataIndex: 'openTime',
    key: 'openTime',
    singleLine: true,
  }, {
    title: '出售中商品',
    dataIndex: 'saleingNumber',
    key: 'saleingNumber',
    singleLine: true,
  }, {
    title: '排期商品数',
    dataIndex: 'schedulingNumber',
    key: 'schedulingNumber',
    singleLine: true,
  }, {
    title: '预排期商品数',
    dataIndex: 'preschedulingNumber',
    key: 'preschedulingNumber',
    singleLine: true,
  }, {
    title: '所属分公司',
    dataIndex: 'branchName',
    key: 'branchName',
    singleLine: true,
  }, {
    title: '操作',
    width: 140,
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={e => goCityDetail(record)}>查看详情</a>
        </div>
      )
    }
  }]
}