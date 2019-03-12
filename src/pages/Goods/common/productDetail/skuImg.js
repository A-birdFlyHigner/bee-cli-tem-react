import React from 'react'
import Sty from './index.less'
import ImgPreview from '@/components/ImgPreview'

export default [
  {
    label: 'sku主图',
    className: 'box-header',
    render () {
      return <span className={Sty.headerSpan}>（销售属性项：颜色）</span>
    }
  }, {
    name: 'saleUnitImages',
    value: [],
    render (values) {
      const {saleUnitImages = []} = values
      return (
        <div className={Sty.skuImgBox}>
          {
            saleUnitImages.map((item) => {
              return (
                <div className={Sty.imgInline} key={item.id}>
                  <span>{ item.propertyPairId }：</span>
                  <ImgPreview url={item.url} />
                </div>
              )
            })
          }
        </div>
      )
    }
  }
]