import React, { Component } from 'react'
import { LeForm } from '@lib/lepage'
import { message } from 'antd'
import baseInfo from './config/baseInfo'
import salseEdit from './config/salseEdit'
import wareHouse from './config/wareHouse'
import skuMainImg from './config/skuImg'
import productInfo from './config/productInfo'
import elseInfo from './config/elseInfo'
import productImg from './config/productImg'

// 确定 err, values
const confirm = ()=> {

  // 请求接口前校验 会员价格
  message.warning('请求接口前校验 会员价格提示！')

  // TODO: 请求通过审核接口

  // TODO: 接口请求成功返回
  window.history.back(-1)  

}

// 取消 err, values
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
