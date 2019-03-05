import Sty from '../Index.less'

export default [
  {
    label: '商品主图',
    className: 'box-header',
  }, {
    render (vals, core) {
      return (
        <div className={Sty.skuImgBox}>
          <div>商品主图：</div>
          {
            ['黑色', '白色', '蓝色', '绿色'].map((item, index) => {
              return (
                <div className={Sty.imgInline} key={index}>
                  <img src="http://qimg.hxnews.com/2019/0130/1548847547452.jpg" />
                </div>
              )
            })
          }
        </div>
      )
    }
  }, {
    render (vals, core) {
      return (
        <div className={Sty.skuImgBox}>
          <div>商品详情图：</div>
          {
            ['黑色', '白色', '蓝色', '绿色'].map((item, index) => {
              return (
                <div className={Sty.imgInline} key={index}>
                  <img src="http://qimg.hxnews.com/2019/0130/1548847547452.jpg" />
                </div>
              )
            })
          }
        </div>
      )
    }
  }
]