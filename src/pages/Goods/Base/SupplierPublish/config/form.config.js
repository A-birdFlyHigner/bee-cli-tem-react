import getCategoryConfig from './category.config'
import getBaseInfoConfig from './base.info.config'
import getSalePropertiesConfig from './sale.properties.config'
import getSkuMainImageConfig from './sku.main.image.config'
import getGoodsPropertiesConfig from './goods.properties.config'
import getWarehousePropertiesConfig from './warehouse.properties.config'
import getGoodsMainImageConfig from './goods.main.image.config'
import getButtonsConfig from './button.config'
import getGoodsDetailImageConfig from './goods.detail.image.config'
import { Cache } from '../utils'

const buttonCache = Cache.create('button.config')

// FIXME: 与 sale.properties.config 有重复定义
const DEFAULT_SKU = {
  status: 1, // 1可用，0停用
  costPrice: '', // 成本价, 单位分
  restriction: 10, // sku限购数量
  deliverCode: '',// 发货编码
  propertyValueNames: [],
  propertyPairIds: [],
  enableDeliverCode: false
}

const getDefaultSkus = (saleProperties = []) => {
  if (saleProperties.length === 0) {
    const skus = [{
      ...DEFAULT_SKU,
      key: 'default',
      propertyValueNames: ['默认'],
      propertyPairIds: [],
    }]
    return skus
  }

  return []
}

// 发布商品表单配置
export default (categoryProperties = {}, globalOptions = {}) => {
  const {
    saleProperties,
    goodsProperties,
    warehouseProperties,
    isRequiredSKUImage,
    skuImagePropertyId,
    skuImagePropertyName
  } = categoryProperties
  return {
    settings: {
      values: {
        skus: getDefaultSkus(saleProperties)
      },
      onChange (changeKeys, values, leForm) {
        const { isSubmit = false } = buttonCache.get()
        if (isSubmit) {
          leForm.validateItem(changeKeys);
        }
      }
    },
    form: {
      layout: {
        label: 'w140'
      }
    },
    items: [
      getCategoryConfig(globalOptions), // 类目信息
      getBaseInfoConfig(), // 基本信息
      getSalePropertiesConfig(saleProperties, globalOptions), // 销售属性
      getSkuMainImageConfig({
        isRequiredSKUImage,
        skuImagePropertyId,
        skuImagePropertyName
      }), // SKU主图
      getGoodsPropertiesConfig(goodsProperties), // 商品属性
      getWarehousePropertiesConfig(warehouseProperties), // 仓库属性
      getGoodsMainImageConfig(), // 商品主图
      getGoodsDetailImageConfig() // 商品详情图
    ],
    buttons: getButtonsConfig(globalOptions)
  }
}
