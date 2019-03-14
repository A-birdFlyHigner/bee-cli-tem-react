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

const actionCache = Cache.manage('action')

// 发布商品表单配置
export default (categoryProperties) => {
  return {
    settings: {
      values: {},
      onChange (changeKeys, values, leForm) {
        const { isSubmit = false } = actionCache.get()
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
      getCategoryConfig(), // 类目信息
      getBaseInfoConfig(), // 基本信息
      getSalePropertiesConfig(categoryProperties.saleProperties), // 销售属性
      getSkuMainImageConfig({
        isRequiredSKUImage: categoryProperties.isRequiredSKUImage,
        skuImagePropertyId: categoryProperties.skuImagePropertyId,
        skuImagePropertyName: categoryProperties.skuImagePropertyName
      }), // SKU主图
      getGoodsPropertiesConfig(categoryProperties.goodsProperties), // 商品属性
      getWarehousePropertiesConfig(categoryProperties.warehouseProperties), // 仓库属性
      getGoodsMainImageConfig(), // 商品主图
      getGoodsDetailImageConfig() // 商品详情图
    ],
    buttons: getButtonsConfig()
  }
}
