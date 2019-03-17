import Cache from './cache'

const saleCache = Cache.create('sale.properties.config')

const DEFAULT_SKU = {
  status: 1, // 1可用，0停用
  costPrice: '', // 成本价, 单位分
  restriction: 10, // sku限购数量
  deliverCode: '',// 发货编码
  propertyValueNames: [],
  propertyPairIds: [],
  enableDeliverCode: false
}

const getSkuByCurPair = (curPair, enableDeliverCode)=> {
  const key = curPair.value
  const cache = saleCache.get(key)
  if (cache) return cache

  const sku = {
    ...DEFAULT_SKU,
    key,
    propertyValueNames: [curPair.label],
    propertyPairIds: [curPair.value],
    enableDeliverCode,
    notHas: curPair.notHas
  }
  return sku
}

const getSkuByPreSkuAndCurPair = (preSku, curPair, enableDeliverCode) => {
  const key = `${preSku.key}-${curPair.value}`
  const cache = saleCache.get(key)
  if (cache) return cache

  const sku = {
    ...DEFAULT_SKU,
    key,
    propertyValueNames: [...preSku.propertyValueNames, curPair.label],
    propertyPairIds: [...preSku.propertyPairIds, curPair.value],
    enableDeliverCode
  }
  return sku
}

// 获取sku规格
export default (propertyPairGroups = [], enableDeliverCode = false) => {
  const skus = propertyPairGroups.reduce((preSkus, curPairs, arr) => {
    if (preSkus.length === 0) {
      if (curPairs.length === 0) return []

      // 第一个属性，或者是单维的sku
      return curPairs.map(curPair => {
        const sku = getSkuByCurPair(curPair, enableDeliverCode)
        saleCache.set(sku.key, {...sku})
        return sku
      })
    }

    if (curPairs.length === 0) return preSkus

    // 多维的sku
    const combs = preSkus.map(preSku => {
      return curPairs.map(curPair => {
        const sku = getSkuByPreSkuAndCurPair(preSku, curPair, enableDeliverCode)
        saleCache.set(sku.key, {...sku})
        return sku
      })
    })

    return [].concat(...combs)
  }, [])

  return skus
}
