import { getHead } from './common.config'
import uploadConfig from '@/components/Rules/imgUpload/index'

// 获取商品主图表单配置
const getGoodsMainImageConfig = () => {
  return (leForm) => {
    return [
      getHead('商品主图'),
      uploadConfig({
        label: '商品主图',
        name: 'goodsMainImageList',
        props: {
          required: true,
          top: '必填，1-5张商品主图，分辨率640*640，文件小于400KB',
          listType: 'picture-card',
          className: 'avatar-uploader',
        }
      })(leForm)
    ]
  }
}

export default getGoodsMainImageConfig
