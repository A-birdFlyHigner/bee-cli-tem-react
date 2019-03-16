import React from 'react'
import router from 'umi/router'

// 查看详情  TODO:点击查看渠道商品审核通过已排期列表，直接选中相应城市显示
const goCityDetail = (cityCode) => {
  router.push({
    pathname: '/goods/schedule/branchlist',
    query: {
      tabType: '3',
      cityCode
    }
  })
}

export default {
  rowKey: '1',
  scroll: { x: 1300 },
  columns: [{
    title: '城市id',
    dataIndex: 'cityCode',
    key: 'cityCode',
    align: 'center',     
    singleLine: true,
  }, {
    title: '城市',
    dataIndex: 'cityName',
    key: 'cityName',
    align: 'center',     
    singleLine: true,
  }, {
    title: '所属省份',
    dataIndex: 'provinceName',
    key: 'provinceName',
    align: 'center',     
    singleLine: true,
  }, {
    title: '开抢时间',
    dataIndex: 'activeTimeStr',
    key: 'activeTimeStr',
    align: 'center',     
    singleLine: true,
  }, {
    title: '出售中商品数',
    dataIndex: 'hotProductCount',
    key: 'hotProductCount',
    align: 'center',     
    singleLine: true,
  }, {
    title: '排期商品数',
    dataIndex: 'schedulingProductCount',
    key: 'schedulingProductCount',
    align: 'center',     
    singleLine: true,
  }, {
    title: '预排期商品数',
    dataIndex: 'preScheduleProductCount',
    key: 'preScheduleProductCount',
    align: 'center',     
    singleLine: true,
  }, {
    title: '操作',
    width: 140,
    align: 'center', 
    fixed: 'right',    
    render: (text, record) => {
      return (
        <div className="operateBtn-container-inline">
          <a onClick={()=> goCityDetail(record.cityCode)}>查看详情</a>
        </div>
      )
    }
  }]
}