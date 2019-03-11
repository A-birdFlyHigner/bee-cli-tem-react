import React from 'react'
import { LeDialog, LeForm } from '@lib/lepage'
import { ImageTextCard } from '@/components/InfoCard'
import * as Sty from '../index.less'

import SkuDetail from '../../../common/skuInfo'
import StoreInfo from '../../../common/storeInfo'

const dialogFormConfig =  () => {

  return {
    form: {
      layout: { // 表单布局 左侧和右侧比例
        label: 0,
        control: 24
      }
    },
    items: [
      {
        label: '',
        name: 'text',
        render: () => {
          return(
            <div>
              <div className={Sty.dialogMb}>确定对商品进行以下审核？</div>
            </div>
          )
        },
      },
      {
        label: '',
        name: 'chooseType',
        component: 'RadioGroup',
        follow: true,
        props:{
          options:[
            {
              label:'通过',
              value:0,
            },
            {
              label:'拒绝',
              value:1,
            }
          ]
        }
      },
      {
        label:'',
        name: 'reason',
        component: 'Input',
        className: Sty.rejectReason,
        props:{
          placeholder: '请输入拒绝原因，不超过20字',
          maxLength: 20,
        },
        // when true false 控制隐藏显示此组件
        when: (val) => {
          return val.chooseType === 1
        }
      }
    ],
  }
}

// 渠道商品规格详情
const getSkuDetail = (id) => {
  LeDialog.show({
    title: '渠道商品规格详情',
    width: '800px',
    maskClosable: true,
    footer () {
      return null
    },
    content () {
      return (
        <SkuDetail productId={id} />
      )
    }
  })
}

// 库存信息
const getStoreInfo = (id) => {
  LeDialog.show({
    title: '库存信息',
    width: '1000px',
    maskClosable: true,
    footer () {
      return null
    },
    content () {
      return (
        <StoreInfo productId={id} />
      )
    }
  })
}

// 审核
const goExamine = () => {
  LeDialog.show(
    {
      title: '审核',
      width: '600px',
      content () {
        return <LeForm {...dialogFormConfig()} />
      },
      onOk: (values, suc, ) => {
        suc()
      }
    }
  )
}



export default {
  rowKey: 'id',
  scroll: { x: 1800 },
  rowSelection: {
    selections: true,
    getCheckboxProps() {
      return {};
    },
  },
  columns: [{
    title: '渠道商品id',
    dataIndex: 'cityCode',
    key: 'cityCode',
    align: 'center',            
    singleLine: true,
  }, {
    title: '基础信息',
    dataIndex: 'id',
    render: (val, record) => {
      return (
        <ImageTextCard
          image={record.weixinQrcode}
          infoList={[
            {
              label: '商品名称',
              value: record.provinceName,
            },
            {
              label: '商品Id',
              value: record.id,
            },
          ]}
        />
      )
    }
  }, {
    title: '类目',
    dataIndex: 'categoryPath',
    key: 'categoryPath',
    align: 'center',    
    width: 100,                       
    mutipleLine: true,
    render: () => {
      const vals = '食品,水果,橘子'
      return (
        <div>
          {
            vals && vals.split(',').map(
              (item) => (
                <span key={item}>
                  &gt;
                  { item }<br />
                </span>
              )
            )
          }
        </div>
      )
    },
  }, {
    title: '规格',
    dataIndex: 'name',
    key: 'name',
    align: 'center', 
    width: 100,                   
    render: (val, record) => {
      return(
        <span>
          3个<br />
          <a className="linkButton" onClick={()=> getSkuDetail(record.id)}>查看</a>
        </span>
      )
    }
  }, {
    title: '价格信息',
    dataIndex: 'price',
    key: 'price',
    width: 300,               
    align: 'center',                
    render: () => {
      return (
        <div className={Sty.prices}>
          <span>市场价:80.00~100.00</span><br />
          <span>成本价:80.00~100.00</span><br />
          <span>非会员价:80.00~101.00</span><br />
          <span>非会员价:60.00~102.00</span><br />
        </div>
      )
    }
  }, {
    title: '出售时间',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    align: 'center', 
    width: 100,                   
    singleLine: true,
  }, {
    title: '库存信息',
    dataIndex: 'storeInfo',
    key: 'storeInfo',
    width: 200,                   
    align: 'center',                
    render: (val, record) => {
      return (
        <div className={Sty.store}>
          <span>推广库存：100</span><br />
          <span>累计售出：10</span><br />
          <a className="linkButton" onClick={()=> getStoreInfo(record.id)}>查看</a>
        </div>
      )
    }
  }, {
    title: '地址信息',
    dataIndex: 'addressInfo',
    key: 'addressInfo',
    align: 'center',     
    width: 300,                              
    render: () => {
      return (
        <div className={Sty.store}>
          <p>分公司：长沙分1</p>
          <p>出售城市：长沙</p>
          <p>店铺ID：10</p>
          <p>店铺名称：长沙一哥店铺</p>
        </div>
      )
    }
  },  {
    title: '审核状态',
    dataIndex: 'examineStatus',
    key: 'examineStatus',
    width: 400,
    align: 'center',                
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
          <a onClick={()=> goExamine(record)}>审核</a>
        </div>
      )
    }
  }]
}
