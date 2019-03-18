import React from 'react'
import { Alert } from 'antd'
import { LeForm } from '@lib/lepage'
import { Cache } from '../utils'
import { SALE_PROPERTY_NAME_ID, getHead } from './common.config'
import uploadConfig from '@/components/Rules/imgUpload/index'

const DEFAULT_OPTIONS = {
  isRequiredSKUImage: false,
  skuImagePropertyId: null,
  skuImagePropertyName: ''
}

const UPLOAD_OPTIONS = {
  limit: 1,
  size: 400,
  types: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
  width: 640,
  height: 640,
}

const skuMainImageCache = Cache.create('sku.main.image.config')
const buttonCache = Cache.create('button.config')

const getFormConfig = (leForm, propertyPairs = []) => {
  return {
    settings: {
      onChange (changeNames, values) {
        changeNames.forEach(name => {
          skuMainImageCache.set(name, values[name] || [])
        })

        // 仅校验 sku 主图
        const { isSubmit = false } = buttonCache.get()
        if (isSubmit) {
          leForm.validateItem(['skuMainImageList']);
        }
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
          value: skuMainImageCache.get(name),
          className: 'no-form-item-sku-main-image-list',
          props: {
            listType: 'picture-card',
            className: 'avatar-uploader',
          },
          options: UPLOAD_OPTIONS,
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
  const {
    isRequiredSKUImage: required,
    skuImagePropertyId,
    skuImagePropertyName
  } = options
  const relatedName = `${SALE_PROPERTY_NAME_ID}-${skuImagePropertyId}` // salePropertyNameId-{propertyNameId}

  let childLeForm = null
  const handleChildLeFormMount = (leForm) => {
    childLeForm = leForm
  }

  let propertyPairIds = []
  const formatValue = () => {
    const list = []
    if (!childLeForm) {
      return list
    }

    const values = childLeForm.getValues()
    for (const pairId of propertyPairIds) {
      if (!values[pairId] || values[pairId].length !== 1) {
        list.push(null)
        continue
      }
      const item = values[pairId][0] // limit 1
      list.push({
        ...item,
        propertyPairId: pairId
      })
    }
    return list
  }

  return {
    label: 'sku主图',
    name: 'skuMainImageList',
    listenKeys: [relatedName],
    props: {
      top: '必填，分辨率640*640，文件小于400KB!',
      required
    },
    formatValue,
    render(values, leForm) {
      propertyPairIds = values[relatedName] || []
      if (required && propertyPairIds.length === 0) {
        return <Alert message={`请先选择 销售属性：“${skuImagePropertyName}”`} type='info' />
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
      if (required && list.length === 0)
        return result

      if (list.indexOf(null) !== -1)
        return result

      return null
    }
  }
}


// 获取SKU主图表单配置
const getSkuMainImageConfig = (options = DEFAULT_OPTIONS) => {
  const {
    skuImagePropertyId,
    skuImagePropertyName
  } = options

  if (!skuImagePropertyId)
    return null

  return () => {
    return [
      getHead(`sku主图（销售属性项：${skuImagePropertyName}）`),
      // getTip('sku主图：必填，分辨率640*640，文件小于400KB!'),
      getSkuMainImages(options)
    ]
  }
}

export default getSkuMainImageConfig
