import React from 'react'
import Sty from './index.less'
import ImgPreview from '@/components/ImgPreview'

export default [
  {
    label: '商品主图',
    className: 'box-header',
  }, {
    name: 'mainImages',
    value: [],
    component: 'Item',
    render (values) {
      const { mainImages = [] } = values
      return (
        <div className={Sty.ImgBoxItem}>
          <div>商品主图：</div>
          {
            mainImages.map((item) => {
              const { url } = item
              return (
                <div className={Sty.imgInline} key={url}>
                  <ImgPreview url={url} />
                </div>
              )
            })
          }
        </div>
      )
    }
  }, {
    name: 'detailImages',
    component: 'Item',
    value: [],
    render (values) {
      const { detailImages = [] } = values
      return (
        <div className={Sty.ImgBoxItem}>
          <div>商品详情图：</div>
          {
            detailImages.map((item) => {
              const { url } = item
              return (
                <div className={Sty.imgInline} key={url}>
                  <ImgPreview url={url} />
                </div>
              )
            })
          }
        </div>
      )
    }
  }
]