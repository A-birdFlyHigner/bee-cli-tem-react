import uploadConfig from './upload.config'

// 获取商品详情图片表单配置
const getGoodsDetailImageConfig = () => {
  return () => {
    return [
      uploadConfig({
        label: '商品详情',
        name: 'goodsDetailImageList',
        props: {
            top: '必填，图片宽度最小限制尺寸620！',
            listType: 'picture-card',
            className: 'avatar-uploader'
        }
      })
    ]
  }
}

export default getGoodsDetailImageConfig
