import React from 'react'
import router from 'umi/router'

// 查看详情 TODO：点击查看城市排期详情
const goCityDetail = () => {
  router.push({
    pathname: '/goods/base/detail/:id',
  })
}

export default {
  rowKey: 'id',
  scroll: { x: 1300 },
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
    dataIndex: 'provinceName',
    key: 'provinceName',
    singleLine: true,
  }, {
    title: '开抢时间',
    dataIndex: 'activeTimeStr',
    key: 'activeTimeStr',
    singleLine: true,
  }, {
    title: '出售中商品数',
    dataIndex: 'hotProductCount',
    key: 'hotProductCount',
    singleLine: true,
  }, {
    title: '排期商品数',
    dataIndex: 'schedulingProductCount',
    key: 'schedulingProductCount',
    singleLine: true,
  }, {
    title: '预排期商品数',
    dataIndex: 'preScheduleProductCount',
    key: 'preScheduleProductCount',
    singleLine: true,
  }, {
    title: '所属分公司',
    dataIndex: 'branchCompanyName',
    key: 'branchCompanyName',
    singleLine: true,
  }, {
    title: '操作',
    width: 140,
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={()=> goCityDetail(record)}>查看详情</a>
        </div>
      )
    }
  }]
}