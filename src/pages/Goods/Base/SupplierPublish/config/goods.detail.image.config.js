import uploadConfig from '@/components/Rules/imgUpload/index'

const UPLOAD_OPTIONS = {
  limit: 22,
  // size: 400,
  types: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
  maxHeight: 1000,
  minWidth: 620,
}

// 获取商品详情图片表单配置
const getGoodsDetailImageConfig = () => {
  return (leForm) => {
    return [
      uploadConfig({
        label: '商品详情',
        name: 'goodsDetailImageList',
        className: 'no-form-item-goods-detail-image-list',
        props: {
          required: true,
          top: '必填，最多22张图片，图片宽度最小限制尺寸620，长度最大限制1000，文件小于400KB',
          listType: 'picture-card',
          className: 'avatar-uploader',
          multiple: true
        },
        rules: {
          type: 'array',
          required: true,
          message: '商品详情不能为空',
          max: 22
        },
        options: UPLOAD_OPTIONS
      })(leForm)
    ]
  }
}

export default getGoodsDetailImageConfig
