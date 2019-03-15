import { getHead } from './common.config'

// 获取基础信息表单配置
const getBaseInfoConfig = () => {
  return () => {
    return [
      getHead('基础信息'),
      {
        name: 'saleGoodsId',
        status: 'preview',
        className: 'no-form-item-saleGoodsId'
      },
      {
        name: 'name',
        label: '商品长名称',
        component: 'Input',
        props: {
          required: true,
          maxLength: 40,
          placeholder: '请输入长名称',
          suffix: '简洁描述这是什么商品，展示在小程序端，限40字',
          style: {
            width: '500px'
          }
        },
        rules: {
          type: 'string',
          required: true,
          message: '长名称不能为空，40个汉字以内',
          max: 40
        }
      },
      {
        name: 'desc',
        label: '商品短名称',
        props: {
          required: true,
          maxLength: 20,
          placeholder: '请输入短名称',
          suffix: '提炼文案，展示在小程序端的描述，限20字',
          style: {
            width: '400px'
          }
        },
        rules: {
          type: 'string',
          required: true,
          message: '短名称不能为空，20个汉字以内',
          max: 20
        }
      },
      {
        name: 'brandName',
        label: '品牌',
        props: {
          maxLength: 20,
          placeholder: '请填写品牌',
          suffix: '非必填，填写后将品牌信息展示在商品详情页面'
        },
        rules: {
          type: 'string',
          message: '品牌名不能超过20个字符',
          max: 20
        }
      }
    ]
  }
}

export default getBaseInfoConfig
