import React from 'react'
import { Alert } from 'antd'
import { LeForm } from '@lib/lepage'
import { SALE_PROPERTY_NAME_ID, getHead, getTip } from './common.config'
import uploadConfig from '@/components/Rules/imgUpload/index'

const DEFAULT_OPTIONS = {
  isRequiredSKUImage: false,
  skuImagePropertyId: null,
  skuImagePropertyName: ''
}

// FIXME: 待优化，把 upload组件的 options 单独传，不能放在最外层@泊舟
const UPLOAD_OPTIONS = {
  limit: 1,
  size: 400,
  types: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
  width: 640,
  height: 640,
  // minWidth: '',
}

const Cache = {}

const getFormConfig = (leForm, propertyPairs = []) => {
  return {
    settings: {
      onChange (changeNames, values) {
        changeNames.forEach(name => {
          Cache[`skuMainImageItem-${name}`] = values[name] || []
        })
      }
    },
    form: {
      inline: true,
    },
    items: [
      ...propertyPairs.map(({label, value: name}) => {
        return uploadConfig({
          label,
          name: `${name}`, // propertyPairId
          value: Cache[`skuMainImageItem-${name}`],
          props: {
            listType: 'picture-card',
            className: 'avatar-uploader',
          },
          ...UPLOAD_OPTIONS,
          // options: {}
          rules: {
            type: 'array',
            required: true,
            message: `${label}主图不能为空`
          }
        })
      })
    ]
  }
}

const getSkuMainImages = (options = {}) => {
  const { isRequiredSKUImage: required, skuImagePropertyId, skuImagePropertyName } = options
  const relatedName = `${SALE_PROPERTY_NAME_ID}-${skuImagePropertyId}` // salePropertyNameId-{propertyNameId}

  let childLeForm = null
  const handleChildLeFormMount = (leForm) => {
    childLeForm = leForm
  }

  const formatValue = () => {
    const list = []
    if (!childLeForm) {
      return list
    }

    // FIXME: item 动态被移除后，这里还能获取
    const values = childLeForm.getValues()
    for (const key of Object.keys(values)) {
      if (!values[key] || values[key].length !== 1) {
        list.push(null)
        continue
      }
      const item = values[key][0] // limit 1
      list.push({
        ...item,
        propertyPairId: key
      })
    }
    return list
  }

  return {
    name: 'skuMainImageList',
    listenKeys: [relatedName],
    props: {
      required
    },
    formatValue,
    // when (values) {
    //   const propertyPairIds = values[relatedName] || []
    //   return propertyPairIds.length > 0
    // },
    render(values, leForm) {
      const propertyPairIds = values[relatedName] || []
      if (required && propertyPairIds.length === 0) {
        return <Alert message={`请先选择销售属性-${skuImagePropertyName}`} type='info' />
      }

      const { options: propertyPairs } = leForm.getProps(relatedName)
      const pairs = propertyPairs.filter(propertyPair => {
        return propertyPairIds.indexOf(propertyPair.value) !== -1
      })

      const formConfig = getFormConfig(leForm, pairs)
      return <LeForm {...formConfig} onMount={handleChildLeFormMount} />
    },
    rules: () => {
      const list = formatValue()
      const result = {
        type: 'array',
        required,
        message: 'sku主图不能为空'
      }
      if (required && list.length === 0) return result
      if (list.indexOf(null) !== -1) return result

      return null
    }
  }
}


// 获取SKU主图表单配置
const getSkuMainImageConfig = (options = DEFAULT_OPTIONS) => {
  const { skuImagePropertyId, skuImagePropertyName } = options

  if (!skuImagePropertyId) return null

  return () => {
    return [
      getHead(`sku主图（销售属性项：${skuImagePropertyName}）`),
      getTip('sku主图：必填，分辨率640*640，文件小于400KB!'),
      getSkuMainImages(options)
    ]
  }
}

export default getSkuMainImageConfig
