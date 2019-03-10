import getCategoryConfig from './category.config'
import getBaseInfoConfig from './base.info.config'
import getSalePropertiesConfig from './sale.properties.config'
import getSkuMainImageConfig from './sku.main.image.config'
import getGoodsPropertiesConfig from './goods.properties.config'
import categoryProperties from '../mock/categoryProperties'
import getWarehousePropertiesConfig from './warehouse.properties.config'
import getGoodsMainImageConfig from './goods.main.image.config'
import getButtonsConfig from './button.config'
import getGoodsDetailImageConfig from './goods.detail.image.config'

// 发布商品表单配置
export default {
  settings: {
    values: {}
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

















// const getSkusDataList = (chosenSkus) => {
//   return chosenSkus.reduce((preOptions, curVal, index, arr) => {
//     if (!preOptions || preOptions.length === 0) return curVal.options

//     const result = preOptions.map(preOption => {
//       return curVal.options.map(curOption => {
//         const label = `${preOption.label}-${curOption.label}`
//         const value = `${preOption.value}-${curOption.value}`
//         return {
//           key: value,
//           label,
//           value,
//           status: true,
//           sku: label,
//           skuId: value,
//           price: '',
//           number: ''
//         }
//       })
//     })

//     return [].concat(...result)
//   }, null)
// }
