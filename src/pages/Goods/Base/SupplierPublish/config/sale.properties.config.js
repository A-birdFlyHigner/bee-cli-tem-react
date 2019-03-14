import React from 'react'
import { Table, Button, Input, InputNumber } from 'antd'
import { SALE_PROPERTY_NAME_ID, getHead, getTip } from './common.config'
import { getPropertiesWrap } from './properties.config'
import regUtils from '@/utils/reg'
import { toDecimal2 } from '@/utils/utils'

const DEFAULT_SKU = {
  costPrice: '', // 成本价, 单位分
  deliverCode: '',// 发货编码, 前端校验唯一、玲珑确认
  restriction: 10, // sku限购数量
  propertyValueNames: [],
  propertyPairIds: [],
  status: 1, // 1可用，0停用
  enableDeliverCode: false
}

// 更新sku组合
const updateSkus = (leForm, saleProperties = []) => {
  const relatedNames = saleProperties.map(salePropertie => `${SALE_PROPERTY_NAME_ID}-${salePropertie.propertyNameId}`)
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
  const has69 = leForm.getValue('has69') || false

  const skus = propertyPairGroups.reduce((preSkus, curPairs, arr) => {
    if (preSkus.length === 0) {
      if (curPairs.length === 0) {
        return []
      }

      return curPairs.map(curPair => {
        const key = curPair.value
        const cache = leForm.getCache(key)
        if (cache) return cache

        const sku = {
          ...DEFAULT_SKU,
          key,
          propertyValueNames: [curPair.label],
          propertyPairIds: [curPair.value],
          enableDeliverCode: has69
        }

        leForm.setCache(key, {...sku})
        return sku
      })
    }

    if (curPairs.length === 0) {
      return preSkus
    }

    const combs = preSkus.map(preSku => {
      return curPairs.map(curPair => {
        const key = `${preSku.key}-${curPair.value}`
        const cache = leForm.getCache(key)
        if (cache) return cache

        const sku = {
          ...DEFAULT_SKU,
          key,
          propertyValueNames: [...preSku.propertyValueNames, curPair.label],
          propertyPairIds: [...preSku.propertyPairIds, curPair.value],
          enableDeliverCode: has69
        }

        leForm.setCache(key, {...sku})
        return sku
      })
    })

    return [].concat(...combs)
  }, [])

  leForm.setValue('skus', skus)

  // const skus = [
  //   {
  //     key: '7579',
  //     costPrice: 100, // 成本价, 单位分
  //     deliverCode: "D01",// 发货编码, 前端校验唯一、玲珑确认
  //     restriction: 20, // sku限购数量
  //     propertyValueNames: ['黑色'],
  //     propertyPairIds: [75798],
  //     status: 1, // 1可用，0停用
  //   },
  //   {
  //     key: '75798-75799',
  //     costPrice: 100, // 成本价, 单位分
  //     deliverCode: "D01",// 发货编码, 前端校验唯一、玲珑确认
  //     restriction: 20, // sku限购数量
  //     propertyValueNames: ['黑色', 'S码'],
  //     propertyPairIds: [75798, 75799],
  //     status: 1, // 1可用，0停用
  //   },
  //   {
  //     key: '75798-75800',
  //     costPrice: 200, // 成本价, 单位分
  //     deliverCode: "E01",// 发货编码, 前端校验唯一、玲珑确认
  //     restriction: 30, // sku限购数量
  //     propertyValueNames: ['白色', 'S码'],
  //     propertyPairIds: [75798, 75800],
  //     status: 0, // 1可用，0停用
  //   }
  // ]
}

const getDefaultSkus = (saleProperties = []) => {
  if (saleProperties.length === 0) {
    const key = 'default'
    const skus = [
      {
        ...DEFAULT_SKU,
        key,
        propertyValueNames: ['默认'],
        propertyPairIds: [],
      }
    ]
    return skus
  }

  return []
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

  // 更新sku历史记忆
  skus.forEach((sku) => {
    leForm.setCache(sku.key, sku)
  })

  // 更新sku表格
  leForm.setValues({
    skus
  })
}

// 更新批量
const handleUpdateBatch = (leForm, { colKey, originKey, batchValue, formatValue }) => {
  const value = leForm.getValue('skus') || []
  const skus = value.map((item) => {
      return {
          ...item,
          [colKey]: formatValue || batchValue
      }
  })

  // 更新sku历史记忆
  skus.forEach((sku) => {
    leForm.setCache(sku.key, sku)
  })

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
      updateSkus(leForm, saleProperties)
    }
  }
  return getPropertiesWrap(leForm, saleProperties, options)
}

// 69码
const getHas69 = (leForm) => {
  return {
    label: '商品是否有69码',
    name: 'has69',
    component: 'Checkbox',
    props: {
      onChange: (value) => handleUpdateBatch(leForm, {
        colKey: 'enableDeliverCode',
        originKey: 'has69',
        batchValue: value
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
        maxLength: 10,
        onChange: (e) => {
          const { value } = e.target
          if (value && !regUtils.Price.test(value)) {
            return
          }
          handleUpdateBatch(leForm, {
            colKey: 'costPrice',
            originKey: 'batch-costPrice',
            batchValue: value,
            formatValue: toDecimal2(value)
          })
        },
        onBlur: () => {
          leForm.setValue('batch-costPrice', '')
        }
      }
    },
    {
      name: 'batch-restriction',
      component: 'InputNumber',
      inline: true,
      props: {
        placeholder: '请输入限购数量',
        min: 1,
        maxLength: 10,
        onChange: (value) => {
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
const getColumns = (leForm, has69) => {
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
              const { value } = e.target
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
                  maxLength={10}
                  onChange={(e) => handleValue(e, false)}
                  onBlur={(e) => handleValue(e, true)}
                />
              )
          }
      },
      {
          title: '限购数量',
          dataIndex: 'restriction',
          render (value, item, index) {
              return (
                <InputNumber
                  value={value}
                  min={1}
                  maxLength={10}
                  onChange={(value) => handleUpdateSingle(leForm, {
                    colKey: 'restriction',
                    cellValue: value,
                    rowItem: item,
                    rowIndex: index
                  })}
                />
              )
          }
      },
      // 商品有69码，发货编码必须唯一
      {
        title: 'sku编码(发货编码)',
        dataIndex: 'deliverCode',
        render (value, item, index) {
          const { enableDeliverCode: enable } = item
          return (
            <Input
              value={enable ? value : ''}
              disabled={!enable}
              maxLength={20}
              onChange={(e) => handleUpdateSingle(leForm, {
                colKey: 'deliverCode',
                cellValue: e.target.value,
                rowItem: item,
                rowIndex: index
              })}
            />
          )
        }
      },
  ]

  return columns.filter(column => column !== null)
}

// sku组合
const getSkus = (leForm, saleProperties = []) => {
  return {
      label: 'sku规格',
      name: 'skus',
      value: getDefaultSkus(saleProperties),
      className: 'no-form-item-sku',
      // component: 'Item',
      render ({ skus = [], has69 = false }) {
          const columns = getColumns(leForm, has69)
          const locale = {
            emptyText: '暂无sku规格'
          }
          return <Table columns={columns} dataSource={skus} locale={locale} pagination={false} />
      },
      rules ({ skus = [], has69 = false }) {
        const getMsg = (message) => {
          return { message }
        }

        // 成本价
        {
          const costPrices = skus.map(sku => sku.costPrice || null)
          const hasNull = costPrices.some(item => item === null)
          if (hasNull) {
            return getMsg('成本价不能为空')
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
const getSalePropertiesConfig = (saleProperties = []) => {
  return (leForm) => {
      return [
          getHead('销售属性'),
          getTip('注：商品规格根据类目规定显示，支持0-2级，没有规格时可不填'),
          ...getSaleProperties(leForm, saleProperties),
          getHas69(leForm),
          ...getBatch(leForm),
          getSkus(leForm, saleProperties)
      ]
  }
}

export default getSalePropertiesConfig
