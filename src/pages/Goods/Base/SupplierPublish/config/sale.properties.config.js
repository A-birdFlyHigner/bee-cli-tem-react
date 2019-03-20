import React from 'react'
import { Table, Button, Input } from 'antd'
import { SALE_PROPERTY_NAME_ID, getHead, getTip } from './common.config'
import { getPropertiesWrap } from './properties.config'
import regUtils from '@/utils/reg'
import { Cache, convertSkus } from '../utils'
import { toDecimal2 } from '@/utils/utils'

const saleCache = Cache.create('sale.properties.config')

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

const getDefaultSkus = (saleProperties = [], globalOptions = {}) => {
  if (saleProperties.length === 0) {
    const cache = saleCache.get('default')
    if (cache) return [cache]

    const skus = [{
      ...DEFAULT_SKU,
      key: 'default',
      propertyValueNames: ['默认'],
      propertyPairIds: [],
    }]
    return skus
  }

  const { initValues = {} } = globalOptions

  // ['salePropertyNameId-888', 'salePropertyNameId-999']
  const relateds = saleProperties.map(salePropertie => {
    return {
      name: `${SALE_PROPERTY_NAME_ID}-${salePropertie.propertyNameId}`,
      propertyNameId: salePropertie.propertyNameId
    }
  })

  // [[{ label, value }, { }], [{ label, value }, { }]]
  const propertyPairGroups = relateds.map(related => {
    // const propertyPairIds = leForm.getValue(relatedName) || []
    const propertyPairIds = initValues[related.name] || []
    if (propertyPairIds.length === 0) {
      return []
    }

    const { propertyPairs = [] } = saleProperties.find(property => property.propertyNameId === related.propertyNameId) || {}
    return propertyPairs
    .map(propertyPair => {
      return {
        label: propertyPair.pvName,
        value: propertyPair.id,
        disabled: propertyPair.disabled || false,
        custom: propertyPair.custom || false,
        notHas: propertyPair.notHas || false,
      }
    })
    .filter(propertyOption => {
      return propertyPairIds.indexOf(propertyOption.value) !== -1
    })
  })

  // const enableDeliverCode = leForm.getValue('has69') || false
  const enableDeliverCode = initValues.has69 || false
  const skus = convertSkus(propertyPairGroups, enableDeliverCode)

  return skus
}

// 更新sku规格
const updateSkusValue = (leForm, saleProperties = []) => {
  // ['salePropertyNameId-888', 'salePropertyNameId-999']
  const relatedNames = saleProperties.map(salePropertie => `${SALE_PROPERTY_NAME_ID}-${salePropertie.propertyNameId}`)

  // [[{ label, value }, { }], [{ label, value }, { }]]
  const propertyPairGroups = relatedNames.map(relatedName => {
    const propertyPairIds = leForm.getValue(relatedName) || []
    if (propertyPairIds.length === 0) {
      return []
    }

    const { options: propertyOptions } = leForm.getProps(relatedName)
    return propertyOptions.filter(propertyOption => {
      return propertyPairIds.indexOf(propertyOption.value) !== -1
    })
  })

  const enableDeliverCode = leForm.getValue('has69') || false
  const skus = convertSkus(propertyPairGroups, enableDeliverCode)
  leForm.setValue('skus', skus)
}

// 更新单个
const handleUpdateSingle = (leForm, { colKey, cellValue, rowItem, rowIndex } = {}) => {
  const value = leForm.getValue('skus') || []
  const skus = value.map((item, index) => {
      if (rowIndex !== index) {
          return item
      }
      return {
          ...item,
          [colKey]: cellValue
      }
  })

  skus.forEach((sku) => {
    saleCache.set(sku.key, sku)
  })

  leForm.setValues({
    skus
  })
}

// 更新批量
const handleUpdateBatch = (leForm, { colKey, originKey, batchValue, formatValue = batchValue, updateAllCache }) => {
  const value = leForm.getValue('skus') || []
  const skus = value.map((item) => {
      return {
          ...item,
          [colKey]: formatValue
      }
  })

  if (updateAllCache) {
    saleCache.updateAll(colKey, formatValue)
  }
  else {
    skus.forEach((sku) => {
      saleCache.set(sku.key, sku)
    })
  }

  leForm.setValues({
    [originKey]: batchValue,
    skus
  })
}

// 销售属性
const getSaleProperties = (leForm, saleProperties = []) => {
  const options = {
    namePrefix: SALE_PROPERTY_NAME_ID,
    okFn () {
      updateSkusValue(leForm, saleProperties)
    }
  }
  return getPropertiesWrap(leForm, saleProperties, options)
}

// 69码
const getHas69 = (leForm, globalOptions) => {
  const { disabledHas69 } = globalOptions
  return {
    label: '商品是否有69码',
    name: 'has69',
    component: 'Checkbox',
    props: {
      disabled: disabledHas69,
      onChange: (value) => handleUpdateBatch(leForm, {
        colKey: 'enableDeliverCode',
        originKey: 'has69',
        batchValue: value,
        updateAllCache: true // 修改69码，需要更新所有缓存，否则历史记录回写就会存在状态相反的情况
      })
    }
  }
}

// 批量设置
const getBatch = (leForm) => {
  return [
    {
      label: '批量设置',
      name: 'batch-costPrice',
      follow: true,
      props: {
        placeholder: '请输入成本价',
        maxLength: 12,
        onChange: (e) => {
          let { value = '' } = e.target
          // 临时方案，暂且将句号替换成小数点
          // FIXME: START
          if (value.indexOf('。') > 0 && value.indexOf('.') === -1) {
            value = value.replace('。', '.')
          }
          // FIXME: END

          if (value && !regUtils.Price.test(value)) {
            return
          }
          handleUpdateBatch(leForm, {
            colKey: 'costPrice',
            originKey: 'batch-costPrice',
            batchValue: value,
            // formatValue: toDecimal2(value)
          })
        },
        onBlur: () => {
          leForm.setValue('batch-costPrice', '')
        }
      }
    },
    {
      name: 'batch-restriction',
      inline: true,
      props: {
        placeholder: '请输入限购数量',
        maxLength: 10,
        onChange: (e) => {
          const { value } = e.target
          if (value && !regUtils.Num.test(value)) {
            return
          }

          handleUpdateBatch(leForm, {
            colKey: 'restriction',
            originKey: 'batch-restriction',
            batchValue: value
          })
        },
        onBlur: () => {
          leForm.setValue('batch-restriction', null)
        }
      }
    }
  ]
}

// sku表格列
const getColumns = (leForm, globalOptions = {}) => {
  const columns = [
      {
        title: '状态',
        dataIndex: 'status',
        render (value, item, index) {
          const status = value === 1 ? '可售' : '停售'
          const opposite = value === 1 ? 0 : 1

          return (
            <Button
              size='small'
              onClick={() => handleUpdateSingle(leForm, {
                colKey: 'status',
                cellValue: opposite,
                rowItem: item,
                rowIndex: index
              })}
            >{status}
            </Button>
          )
        }
      },
      {
          title: 'sku组合',
          dataIndex: 'propertyValueNames',
          render (value, item, index) {
            return value.join('-')
          }
      },
      {
          title: '成本价',
          dataIndex: 'costPrice',
          render (value, item, index) {
            const handleValue = (e, isFormat) => {
              let { value = '' } = e.target

              // 临时方案，暂且将句号替换成小数点
              // FIXME: START
              if (value.indexOf('。') > 0 && value.indexOf('.') === -1) {
                value = value.replace('。', '.')
              }
              // FIXME: END

              if (value && !regUtils.Price.test(value)) {
                return
              }

              handleUpdateSingle(leForm, {
                colKey: 'costPrice',
                cellValue: isFormat ? toDecimal2(value) : value,
                rowItem: item,
                rowIndex: index
              })
            }
            return (
              <Input
                value={value}
                maxLength={12}
                onChange={(e) => handleValue(e, false)}
              />
            )
          }
      },
      {
          title: '限购数量',
          dataIndex: 'restriction',
          render (value, item, index) {
              return (
                <Input
                  value={value}
                  maxLength={10}
                  onChange={(e) => {
                    const { value } = e.target
                    if (value && !regUtils.Num.test(value)) {
                      return
                    }
                    handleUpdateSingle(leForm, {
                      colKey: 'restriction',
                      cellValue: value,
                      rowItem: item,
                      rowIndex: index
                    })
                  }}
                />
              )
          }
      },
      // 商品有69码，发货编码必须唯一
      {
        title: 'sku编码(发货编码)',
        dataIndex: 'deliverCode',
        render (value, item, index) {
          const { status } = globalOptions
          const { enableDeliverCode: enable } = item
          return (
            <Input
              value={status === 'update' || enable ? value : ''}
              disabled={!enable}
              maxLength={20}
              onChange={(e) => {
                const { value } = e.target
                if (value && !regUtils.Number.test(value)) {
                  return
                }
                handleUpdateSingle(leForm, {
                  colKey: 'deliverCode',
                  cellValue: value,
                  rowItem: item,
                  rowIndex: index
                })
              }}
            />
          )
        }
      },
  ]

  return columns.filter(column => column !== null)
}

// sku组合
const getSkus = (leForm, saleProperties, globalOptions = {}) => {
  return {
      label: 'sku规格',
      name: 'skus',
      value: getDefaultSkus(saleProperties, globalOptions),
      className: 'no-form-item-sku',
      // component: 'Item',
      render ({ skus = [] }) {
          const columns = getColumns(leForm, globalOptions)
          const locale = {
            emptyText: '暂无sku规格'
          }
          return <Table columns={columns} dataSource={skus} locale={locale} pagination={false} />
      },
      rules ({ skus = [], has69 = false }) {
        const getMsg = (message) => {
          return { message }
        }

        if (skus.length === 0) {
          return getMsg('sku规格不能为空')
        }

        if (skus.length > 200) {
          return getMsg('sku规格不能超过200个')
        }

        // 成本价
        {
          const costPrices = skus.map(sku => sku.costPrice || null)
          const hasNull = costPrices.some(costPrice => costPrice === null)
          if (hasNull) {
            return getMsg('成本价不能为空')
          }

          const hasOver10Million = costPrices.some(costPrice => {
            const num = Number(costPrice)
            return num <= 0 || num >= 10000000
          })
          if (hasOver10Million) {
            return getMsg(`成本价必须大于0元且低于1000万元`)
          }
        }

        // 限购数量
        {
          const restrictions = skus.map(sku => sku.restriction || null)
          const hasNull = restrictions.some(item => item === null)
          if (hasNull) {
            return getMsg('限购数量不能为空')
          }
        }

        // 校验69码
        if (has69) {
          const deliverCodes = skus.map(sku => (sku.deliverCode || '').trim() || null)
          const hasNull = deliverCodes.some(item => item === null)
          if (hasNull) {
            return getMsg('sku编码(发货编码)不能为空')
          }

          const hasRepeat = deliverCodes.length !== [...new Set(deliverCodes)].length
          if (hasRepeat) {
            return getMsg('sku编码(发货编码)不能重复')
          }
        }

        return null
      }
  }
}

// 获取销售属性表单配置
const getSalePropertiesConfig = (saleProperties = [], globalOptions = {}) => {
  return (leForm) => {
      return [
          getHead('销售属性'),
          getTip('注：商品规格根据类目规定显示，支持0-2级，没有规格时可不填'),
          ...getSaleProperties(leForm, saleProperties),
          getHas69(leForm, globalOptions),
          ...getBatch(leForm),
          getSkus(leForm, saleProperties, globalOptions)
      ]
  }
}

export default getSalePropertiesConfig
