import uploadConfig from '@/components/Rules/imgUpload/index'

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
        }
      })(leForm)
    ]
  }
}

export default getGoodsDetailImageConfig
