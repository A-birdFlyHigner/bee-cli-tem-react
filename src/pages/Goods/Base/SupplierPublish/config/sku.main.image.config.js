import React from 'react'
import { Alert } from 'antd'
import { LeForm } from '@lib/lepage'
import { SALE_PROPERTY_NAME_ID, getHead, getTip } from './common.config'
import uploadConfig from './upload.config'

const DEFAULT_OPTIONS = {
  isRequiredSKUImage: false,
  skuImagePropertyId: null,
  skuImagePropertyName: ''
}

const getFormConfig = (propertyChecks = []) => {
  return {
    form: {
      inline: true,
    },
    items: [
      ...propertyChecks.map(({label, value}) => {
        return uploadConfig({
          label,
          name: value, // propertyValueId
          props: {
            listType: 'picture-card',
            className: 'avatar-uploader',
          }
        })
      })
    ]
  }
}

const getSkuMainImages = (options = {}) => {
  const { isRequiredSKUImage, skuImagePropertyId, skuImagePropertyName } = options
  const relatedName = `${SALE_PROPERTY_NAME_ID}-${skuImagePropertyId}` // salePropertyNameId-{propertyNameId}

  return {
    name: 'skuMainImageList',
    listenKeys: [relatedName],
    props: {
      required: isRequiredSKUImage
    },
    // when (values) {
    //   const propertyValueIds = values[relatedName] || []
    //   return propertyValueIds.length > 0
    // },
    render(values, leForm) {
      const propertyValueIds = values[relatedName] || []
      if (isRequiredSKUImage && propertyValueIds.length === 0) {
        return <Alert message={`请先选择销售属性-${skuImagePropertyName}`} type='warning' />
      }

      const { options: propertyOptions } = leForm.getProps(relatedName)
      const propertyChecks = propertyOptions.filter(propertyOption => {
        return propertyValueIds.indexOf(propertyOption.value) !== -1
      })

      const formConfig = getFormConfig(propertyChecks)
      return <LeForm {...formConfig} />
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
      getTip('sku主图：必填，分辨率（常方式），文件小于400KB!'),
      getSkuMainImages(options)
    ]
  }
}

export default getSkuMainImageConfig
