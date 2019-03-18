import Cache from './cache'
import { pick } from './'

const saleCache = Cache.create('sale.properties.config')
const statusCache = Cache.create('sku.status')

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
    disabled: curPair.disabled,
    custom: curPair.custom,
    notHas: curPair.notHas
  }

  saleCache.set(key, {...sku})
  return sku
}

const getSkuByPreSkuAndCurPair = (preSku, curPair, enableDeliverCode) => {
  const appearNotHas = statusCache.get('appearNotHas')

  let notHas = false
  if (preSku.notHas || curPair.notHas) {
    if (!appearNotHas) {
      if (preSku.notHas) {
        statusCache.set('appearNotHas', preSku.key)
        notHas = true
      }
      else if (curPair.notHas) {
        statusCache.set('appearNotHas', curPair.value)
        notHas = true
      }
    }
    else if (preSku.notHas && curPair.disabled) {
      notHas = statusCache.get('appearNotHas') === preSku.key
    }
    else if (curPair.notHas && preSku.disabled) {
      notHas = statusCache.get('appearNotHas') === curPair.value
    }
  }

  const prefixKey = notHas ? 'notHas-' : ''
  const key = `${prefixKey}${preSku.key}-${curPair.value}`
  const cache = saleCache.get(key)
  if (cache) return cache

  let preData = {}
  if (notHas) {
    const cacheKey = preSku.notHas ? curPair.value : preSku.key
    const cacheData = saleCache.get(cacheKey) || {}
    preData = pick(cacheData, ['saleUnitId', 'status', 'costPrice', 'restriction', 'deliverCode', 'enableDeliverCode'])
  }

  const sku = {
    ...DEFAULT_SKU,
    key,
    propertyValueNames: [...preSku.propertyValueNames, curPair.label],
    propertyPairIds: [...preSku.propertyPairIds, curPair.value],
    enableDeliverCode,
    ...preData,
    notHas
  }

  saleCache.set(key, {...sku})
  return sku
}

// 获取sku规格
export default (propertyPairGroups = [], enableDeliverCode = false) => {

  statusCache.reset()

  const skus = propertyPairGroups.reduce((preSkus, curPairs, arr) => {
    if (preSkus.length === 0) {
      if (curPairs.length === 0)
        return []

      // 第一个属性，或者是单维的sku
      return curPairs.map(curPair => getSkuByCurPair(curPair, enableDeliverCode))
    }

    if (curPairs.length === 0)
      return preSkus

    // 多维的sku
    const combs = preSkus.map(preSku => {
      return curPairs.map(curPair => getSkuByPreSkuAndCurPair(preSku, curPair, enableDeliverCode))
    })

    return [].concat(...combs)
  }, [])

  return skus
}
