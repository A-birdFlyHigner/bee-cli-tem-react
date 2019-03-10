import { WAREHOUSE_PROPERTY_NAME_ID, getHead, getTip } from './common.config'
import { getPropertiesWrap } from './properties.config'

// 获取仓库属性表单配置
const getWarehousePropertiesConfig = (warehouseProperties = []) => {
  return (leForm) => {
    return [
      getHead('仓库属性'),
      getTip('注：仓库属性根据商品类目展示，仅仓库传输时使用，不展示在前端'),
      ...getPropertiesWrap(leForm, warehouseProperties, {
        namePrefix: WAREHOUSE_PROPERTY_NAME_ID,
      })
    ]
  }
}

export default getWarehousePropertiesConfig
