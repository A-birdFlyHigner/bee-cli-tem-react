import React, { Component } from 'react'
import router from 'umi/router';
import { LeForm } from '@lib/lepage'
import { message } from 'antd'
import baseInfo from './config/baseInfo'
import salseEdit from './config/salseEdit'
import wareHouse from './config/wareHouse'
import skuMainImg from './config/skuImg'
import productInfo from './config/productInfo'
import elseInfo from './config/elseInfo'
import productImg from './config/productImg'
import examined from './config/examined'

// 确定
const confirm = (err, values)=> {
  const type = values.examineData.chooseType
  if ((!values.examineData.rejuctReason) && (type === 2)) {
    message.warning('请输入拒绝原因！')
    return false
  }

  // TODO: 请求通过审核接口

  // 通过审核 进入审核通过未排期列表， 拒绝 进入审核推广失败列表
  if (type === 1) {
    router.push({
      pathname: '/goods/examine/branchlist'
    })
  } else {
    router.push({
      pathname: '/goods/examine/branchlist',
      query: {
        tabType: '2'
      }
    })
  }

  return false
}

// 取消
const cancel = ()=> {
  window.history.back(-1)
}

export default class Detail extends Component {

  constructor(props) {
    super(props)
    const { match } = this.props
    const { params } = match
    this.state = {
      productId: params.id,
      leFormConf: {
        settings: {
          globalStatus: 'preview'
        },
        form: {
          layout: {
            label: 'w120',
          },
        },
        items: [
          ...baseInfo,
          salseEdit(),
          ...wareHouse,
          ...skuMainImg,
          ...productInfo,
          ...elseInfo,
          ...productImg,
          examined()
        ],
        buttons: [
          {
            inline: true,
            props: {
              type: 'primary',
              children: '确定',
              onClick: confirm
            }
          },
          {
            inline: true,
            props: {
              type: '',
              children: '取消',
              onClick: cancel
            }
          },
        ]
      }
    }
  }

  onMountLeForm = (formCore) => {
    this.formCore = formCore

    // TODO: 接口数据 

    formCore.setValues({
      name: '西伯利亚红苹果',
      smallName: '苹果',
      pinpai: '西伯利亚',
      salseData: [
        {
          status: 1,
          sku: 1,
          skuCode: 31212,
          price: 124,
          stock: 100
        }, {
          status: 4,
          sku: 3,
          skuCode: 31212,
          price: 124,
          stock: 100
        }
      ],
      examineData: {
        rejuctReason: '',  // 拒绝原因
        chooseType: 1,     // 1 通过 2 拒绝
      },
      maozhong: 12,
      zhiliang: 20
    })
  }

  render () {
    const { productId, leFormConf } = this.state

    console.log('==========productId',productId)

    return (
      <div>
        <LeForm {...leFormConf} onMount={this.onMountLeForm} />
      </div>
    )
  }
}
