import React, { Component } from 'react'
import Sty from '../Index.less'

export default class HeaderTip extends Component {

  constructor() {
    super()
    this.state = {}
  }

  render () {
    const tips = [
      '温馨提示：',
      '1、配送方式根据您店铺入驻开放的配送接口显示。',
      '2、发货时效：次日达，根据商品排期销售，截团时间后次日达；预售，根据商品排期销售，截团后可延迟发货。',
      '3、预售发货时间：选择预售，T为开团当天，整数为延迟发货天数。例如T+3，则1月1日开团的商品，预计1月4日发货，发货日期会显示在商品详情页面。',
      '4、推广库存：选中推广的渠道，每个渠道的sku库存一致。例如推广库存100，则批量选中的所有渠道，每个渠道100个推广库存。'
    ]

    return (
      <div className={Sty.tip}>
        {
          tips.map((item) => {
            return <p key={item}>{item}</p>
          })
        }
      </div>
    )
  }
}
