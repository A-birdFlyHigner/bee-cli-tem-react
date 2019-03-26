import React, { Component } from 'react'
import router from 'umi/router'
import { LeForm } from '@lib/lepage'
import { getAdminProductDetail } from '@/services/goods'
import { Button } from 'antd'

import {
  onChange,
  baseInfo,
  salseEdit,
  logistics,
  wareHouse,
  skuMainImg,
  productInfo,
  productImg,
} from '@/pages/Goods/common/productDetail'

const goBack = (record)=>{
  const tabType = record.getValue('tabType')
  router.push({
    pathname: '/goods/schedule/adminList',
    query: {
      tabType
    }
  })
}

export default class Detail extends Component {

  constructor(props) {
    super(props)
    const { match } = this.props
    const { params } = match
    this.store = props        
    const { tabType } = this.store.location.query?this.store.location.query:''

    this.state = {
      tabType,
      productId: params.id,
      leFormConf: {
        settings: {
          globalStatus: 'preview',
          onChange
        },
        form: {
          layout: {
            label: 'w120',
          },
        },
        items: [
          {
            name: 'operateBtn',
            component: 'Item',
            render: (text, record) => {
              return(
                <div className="operateBtn" onClick={()=> goBack(record)}>
                  <Button>返回</Button>                            
                </div>
              )
            },
          },
          ...baseInfo,
          salseEdit(true),
          ...logistics,
          ...wareHouse,
          ...skuMainImg,
          ...productInfo,
          ...productImg,
        ],
      }
    }
  }

  onMountLeForm = (formCore) => {
    this.formCore = formCore
    const { productId, tabType } = this.state

    getAdminProductDetail({productId: Number(productId)}).then(res => {
      if (!res) return
      formCore.setValues({
        ...res,
        tabType
      })
    })
  }

  render () {
    const { leFormConf } = this.state

    return (
      <div>
        <LeForm {...leFormConf} onMount={this.onMountLeForm} />
      </div>
    )
  }
}
