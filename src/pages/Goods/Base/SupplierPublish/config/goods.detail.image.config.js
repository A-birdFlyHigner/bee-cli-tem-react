import uploadConfig from '@/components/Rules/imgUpload/index'

// FIXME: 待优化，把 upload组件的 options 单独传，不能放在最外层@泊舟
const UPLOAD_OPTIONS = {
  limit: 22,
  size: 400,
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
        props: {
          required: true,
          top: '必填，最多22张图片，图片宽度最小限制尺寸620，长度最大限制1000，文件小于400KB',
          listType: 'picture-card',
          className: 'avatar-uploader'
        },
        rules: {
          type: 'array',
          required: true,
          message: '商品详情不能为空',
          max: 22
        },
        ...UPLOAD_OPTIONS
      })(leForm)
    ]
  }
}

export default getGoodsDetailImageConfig
