import Sty from '../Index.less'

export default [
  {
    label: 'sku主图',
    className: 'box-header',
  }, {
    render (vals, core) {
      return (
        <div className={Sty.skuImgBox}>
          {
            ['黑色', '白色', '蓝色', '绿色'].map((item, index) => {
              return (
                <div className={Sty.imgInline} key={index}>
                  <span>{ item }：</span>
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