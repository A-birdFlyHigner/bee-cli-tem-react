import React from 'react'
import * as Sty from '../index.less'
import router from 'umi/router'

// 查看详情  TODO:点击查看渠道商品审核通过已排期列表，直接选中相应城市显示
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