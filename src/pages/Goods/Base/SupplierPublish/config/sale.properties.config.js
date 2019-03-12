import React from 'react'
import { Table, Button, Input } from 'antd'
import { SALE_PROPERTY_NAME_ID, getHead, getTip } from './common.config'
import { getPropertiesWrap } from './properties.config'

const DEFAULT_SKU = {
  costPrice: '', // 成本价, 单位分
  deliverCode: '',// 发货编码, 前端校验唯一、玲珑确认
  restriction: 10, // sku限购数量
  propertyValueNames: [],
  propertyPairIds: [],
  status: 1, // 1可用，0停用
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
        }

        leForm.getCache(key, {...sku})
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
        }

        leForm.getCache(key, {...sku})
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

// 触发单个更新操作
const onChangeUpdateSingle = (leForm, { colKey, cellValue, rowItem, rowIndex } = {}) => {
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

// 触发批量更新操作
const onChangeUpdateBatch = (leForm, { colKey, batchKey, batchVal }) => {
  const value = leForm.getValue('skus') || []
  const skus = value.map((item) => {
      return {
          ...item,
          [colKey]: batchVal
      }
  })

  // 更新sku历史记忆
  skus.forEach((sku) => {
    leForm.setCache(sku.key, sku)
  })

  // 更新sku表格
  leForm.setValues({
      [batchKey]: batchVal,
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
const getHas69Code = () => {
  return {
      label: '商品是否有69码',
      name: 'has69',
      value: false,
      component: 'Checkbox'
  }
}

// 批量设置
const getBatch = (leForm) => {
  return [
      // {
      //     label: '批量设置',
      //     name: 'batch-deliverCode',
      //     follow: true,
      //     props: {
      //         placeholder: '请输入sku编码',
      //         onChange: (e) => onChangeUpdateBatch(leForm, {
      //           colKey: 'deliverCode',
      //           batchKey: 'batch-deliverCode',
      //           batchVal: e.target.value
      //         })
      //     }
      // },
      {
        label: '批量设置',
        name: 'batch-costPrice',
        follow: true,
        props: {
          placeholder: '请输入成本价',
          onChange: (e) => onChangeUpdateBatch(leForm, {
            colKey: 'costPrice',
            batchKey: 'batch-costPrice',
            batchVal: e.target.value
          })
        }
      },
      {
        name: 'batch-restriction',
        inline: true,
        component: 'InputNumber',
        props: {
          placeholder: '请输入限购数量',
          min: 0,
          onChange: (value) => onChangeUpdateBatch(leForm, {
            colKey: 'restriction',
            batchKey: 'batch-restriction',
            batchVal: value
          })
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
              onClick={() => onChangeUpdateSingle(leForm, {
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
      // 商品有69码，发货编码必须唯一
      (has69
        ? {
            title: 'sku编码(发货编码)',
            dataIndex: 'deliverCode',
            render (value, item, index) {
                return (
                  <Input
                    value={value}
                    onChange={(e) => onChangeUpdateSingle(leForm, {
                      colKey: 'deliverCode',
                      cellValue: e.target.value,
                      rowItem: item,
                      rowIndex: index
                    })}
                  />
                )
            }
          }
        : null
      ),
      {
          title: '成本价',
          dataIndex: 'costPrice',
          render (value, item, index) {
              return (
                <Input
                  value={value}
                  onChange={(e) => onChangeUpdateSingle(leForm, {
                    colKey: 'costPrice',
                    cellValue: e.target.value,
                    rowItem: item,
                    rowIndex: index
                  })}
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
                  onChange={(e) => onChangeUpdateSingle(leForm, {
                    colKey: 'restriction',
                    cellValue: e.target.value,
                    rowItem: item,
                    rowIndex: index
                  })}
                />
              )
          }
      }
  ]

  return columns.filter(column => column !== null)
}

// sku组合
const getSkus = (leForm, saleProperties = []) => {
  return {
      name: 'skus',
      value: getDefaultSkus(saleProperties),
      component: 'Item',
      render ({ skus: dataSource, has69 }) {
          const columns = getColumns(leForm, has69)
          return <Table columns={columns} dataSource={dataSource} pagination={false} />
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
          getHas69Code(),
          ...getBatch(leForm),
          getSkus(leForm, saleProperties)
      ]
  }
}

export default getSalePropertiesConfig
