import React from 'react'
import Sty from './index.less'
import ImgPreview from '@/components/ImgPreview'

const whenFun = (values) => {
  const {saleUnitImages = []} = values
  return !!saleUnitImages.length
}

export default [
  {
    label: 'sku主图',
    className: 'box-header',
    render (values) {
      const {saleUnitImages = []} = values
      const first = saleUnitImages.length ? saleUnitImages[0] : ''
      return first ? <span className={Sty.headerSpan}>（销售属性项：{first.pnName}）</span> : ''
    },
    when: whenFun
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
                  <span>{ item.pvName }：</span>
                  <ImgPreview url={item.url} />
                </div>
              )
            })
          }
        </div>
      )
    },
    when: whenFun
  }
]