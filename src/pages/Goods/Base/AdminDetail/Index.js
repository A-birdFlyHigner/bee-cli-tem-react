import React, { Component } from 'react'
import { LeForm } from '@lib/lepage'
import {queryBranchProductSpreadDetail} from '@/services/goods'
import {
  baseInfo,
  salseInfo,
  salseEdit,
  logistics,
  wareHouse,
  skuMainImg,
  productInfo,
  productImg,
} from '@/pages/Goods/common/productDetail'

export default class Detail extends Component {

  constructor(props) {
    super(props)
    const { match } = this.props
    const { params } = match
    this.state = {
      productId: params.id,
      leFormConf: {
        settings: {
          globalStatus: 'preview',
          onChange: (changeKeys, values, core) => {
            const {techServiceRate} = values
            const skuList = values.saleUnits.map(sku => {
              const {memberPrice, nonmemberPrice, costPrice, grossProfit} = sku
              const memeberCommission = ((memberPrice*10000 - memberPrice*techServiceRate*100 - costPrice*10000 - (grossProfit==='-'? '0' : grossProfit)*10000)/10000).toFixed(2)
              const noMemeberCommission = ((nonmemberPrice*10000 - nonmemberPrice*techServiceRate*100 - costPrice*10000 - (grossProfit==='-'? '0' : grossProfit)*10000)/10000).toFixed(2)
              return {
                ...sku,
                memeberCommission,
                noMemeberCommission,
              }
            })
            core.setValue({
              saleUnits: skuList
            })
          }
        },
        form: {
          layout: {
            label: 'w120',
          },
        },
        items: [
          ...baseInfo,
          ...salseInfo,
          salseEdit(),
          salseEdit(true),
          ...logistics,
          ...wareHouse,
          ...skuMainImg,
          ...productInfo,
          ...productImg,
        ]
      }
    }
  }

  onMountLeForm = (formCore) => {
    this.formCore = formCore
    const {productId} = this.state
    queryBranchProductSpreadDetail({channelProductId: productId, productId}).then(res => {
      if (!res) return
      formCore.setValues(res)
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
