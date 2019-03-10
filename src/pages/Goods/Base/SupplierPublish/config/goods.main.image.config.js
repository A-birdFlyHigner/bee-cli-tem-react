import {
  getHead
} from './common.config'
import uploadConfig from './upload.config'

// 获取商品主图表单配置
const getGoodsMainImageConfig = () => {
  return () => {
    return [
      getHead('商品主图'),
      uploadConfig({
        label: '商品主图',
        name: 'goodsMainImageList',
        props: {
          suffix: '必填，1-5张商品主图，分辨率xx,文件小于400KB)',
          required: true,
          listType: 'picture-card',
          className: 'avatar-uploader',
        }
      })
    ]
  }
}

export default getGoodsMainImageConfig
