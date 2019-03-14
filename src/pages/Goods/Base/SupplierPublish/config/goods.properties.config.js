import { GOODS_PROPERTY_NAME_ID, getHead, getTip } from './common.config'
import { getPropertiesWrap } from './properties.config'

// 获取商品属性表单配置
const getGoodsPropertiesConfig = (goodsProperties = []) => {
  return (leForm) => {
    return [
      getHead('商品属性'),
      getTip('注：根据商品类目不同，展示商品属性字段不同。'),
      ...getPropertiesWrap(leForm, goodsProperties, {
        namePrefix: GOODS_PROPERTY_NAME_ID
      }),
    ]
  }
}

export default getGoodsPropertiesConfig
