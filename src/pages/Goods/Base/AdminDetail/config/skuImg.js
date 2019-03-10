import React from 'react'
import Sty from '../Index.less'
import ImgPreview from '@/components/ImgPreview'

export default [
  {
    label: 'sku主图',
    className: 'box-header',
    render (vals, cores) {
      return <span className={Sty.headerSpan}>（销售属性项：颜色）</span>
    }
  }, {
    render (vals, core) {
      return (
        <div className={Sty.skuImgBox}>
          {
            ['黑色', '白色', '蓝色', '绿色'].map((item) => {
              return (
                <div className={Sty.imgInline} key={item}>
                  <span>{ item }：</span>
                  <ImgPreview url="https://img.gegejia.com/b8972d54fc1e4633b438b61ed79f5a3b.jpg" />
                </div>
              )
            })
          }
        </div>
      )
    }
  }
]