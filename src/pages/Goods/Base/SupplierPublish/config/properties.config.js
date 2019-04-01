import React from 'react'
import { message as messageApi, Tag } from 'antd';
import { emptyFn, Cache } from '../utils'
import { saveCategoryPropertyPair } from '@/services/goods'

const skuNotHasCache = Cache.create('sku.nothas')
const inputTypesCache = Cache.create('input.types')

// 属性值输入类型枚举
const COMPONENT_ENUMS = {
  1: 'Select',
  2: 'RadioGroup',
  3: 'CheckboxGroup',
  4: 'CheckboxGroup',
  5: 'Input',
  6: 'DatePicker', // 日期
  7: 'DatePicker' // 时间
}

// 错误占位符前缀枚举
const MESSAGE_PREFIX = {
  1: '请选择',
  2: '请选择',
  3: '请选择',
  4: '请选择',
  5: '请填写',
  6: '请选择',
  7: '请选择',
}

// 添加属性对
const handleAddPropertyPair = async (leForm, name, event, okFn = emptyFn) => {
  const { target = {} } = event
  if (target.disabled) return

  let {
    value: label = ''
  } = target

  label = label.trim()
  if (!label) {
    messageApi.warn('属性名不能为空!')
    return
  }

  const props = leForm.getProps(name)
  const options = [].concat(props.options || [])

  const exist = options.some(option => option.label === label)
  if (exist) {
    messageApi.warn('属性名不能重复!')
    return
  }
  target.disabled = true

  // 创建属性对
  const propertyPairId = await saveCategoryPropertyPair({
    propertyNameId: name.split('-')[1],
    propertyValue: label
  })

  if (!propertyPairId) {
    messageApi.error('属性名创建失败')
  }
  else {
    // FIXME: 待优化，sku相关逻辑不能放在公共管理
    const notHas = skuNotHasCache.get(name) || false

    // add
    options.push({
      label,
      value: propertyPairId,
      custom: true,
      notHas
    })

    // update
    leForm.setProps(name, {
      options
    })

    // clear
    target.value = ''
    setTimeout (() => {
      target.focus();
    }, 300)

    okFn()
  }
  target.disabled = false
}

// 删除属性对
const handleRemPropertyPair = (leForm, name, propertyPairId, inputType, okFn = emptyFn) => {
  // update props
  const { options = [] } = leForm.getProps(name)
  const propertyPairs = options.filter(({ value }) => value !== propertyPairId)
  leForm.setProps(name, {
    options: propertyPairs
  })

  if (inputType === 2) { // 2 单选自定义
    leForm.setValue(name, null)
  }
  else if (inputType === 4) { // 4 多选自定义
    // update value
    const values = (leForm.getValue(name) || []).filter(value => value !== propertyPairId)
    leForm.setValue(name, values)
  }

  // complete
  okFn()
}

// 修改属性对值
const handleChangeValue = (leForm, name, value, okFn = emptyFn) => {
  leForm.setValue(name, value)
  okFn()
}

// 属性项包装
const getPropertiesWrap = (leForm, properties = [], options = {}) => {
  const { okFn = emptyFn, namePrefix = 'pnId' } = options
  const result = properties.map(property => {
    const {
      propertyName: label,
      propertyNameId,
      inputType,
      propertyPairs = [],
      isRequired: required
    } = property

    const name = `${namePrefix}-${propertyNameId}`
    const message = `${MESSAGE_PREFIX[inputType]}${label}`
    const restProps = {}
    const restRules = {}
    let customInputItem = null
    let selectedTagItem = null

    // 记录销售属性、商品属性、仓库属性对应的输入类型，用于提交前数据校验
    inputTypesCache.set(name, inputType)

    // 有选项
    if ([1, 2, 3, 4].indexOf(inputType) !== -1) {
      restProps.options = propertyPairs.map(propertyPair => {
        return {
          label: propertyPair.pvName,
          value: propertyPair.id,
          disabled: propertyPair.disabled || false,
          custom: propertyPair.custom || false,
          notHas: propertyPair.notHas || false,
        }
      })
    }

    // 限制长度
    if ([5].indexOf(inputType) !== -1) {
      restProps.maxLength = 128
      restRules.whitespace = true
    }

    // 显示占位符
    if ([1, 6, 7].indexOf(inputType) !== -1) {
      restProps.placeholder = message
    }

    // 修改属性值，绑定onChange事件
    if ([2, 5].indexOf(inputType) !== -1) {
      restProps.onChange = (event) => {
        const { value } = event.target
        handleChangeValue(leForm, name, value, okFn)
      }
    }
    else {
      restProps.onChange = (value) => handleChangeValue(leForm, name, value, okFn)
    }

    // 输入框样式
    if ([5, 6, 7].indexOf(inputType) !== -1) {
      restProps.style = {
        width: '220px'
      }
    }

    // 日期格式
    if (inputType === 6) {
      restProps.format = 'YYYY-MM-DD'
    }

    // 时间格式
    if (inputType === 7) {
      restProps.showTime = {
        format: 'HH:mm:ss',
      }
      restProps.format = 'YYYY-MM-DD HH:mm:ss'
    }

    // 2单选可自定义、4多选可自定义
    if ([2, 4].indexOf(inputType) !== -1) {
      customInputItem = {
        inline: true,
        props: {
          placeholder: '自定义',
          maxLength: 10,
          style: {
            minWidth: '100px'
          },
          onPressEnter: (event) => handleAddPropertyPair(leForm, name, event, okFn)
        }
      }

      const getSelectedPropertyPairs = (values) => {
        const { options: pairs } = leForm.getProps(name)

        if (inputType === 2) { // 2单选可自定义
          const pairId = values[name] || null
          return pairs.filter(pair => {
            return pair.custom && pairId === pair.value
          })
        }

        if (inputType === 4) { // 4多选可自定义
          const pairIds = values[name] || []
          return pairs.filter(pair => {
            return pair.custom && pairIds.indexOf(pair.value) !== -1
          })
        }
        return false
      }

      selectedTagItem = {
        label: '自定义标签',
        listenKeys: [name],
        className: 'no-form-item-custom-tag',
        when (values) {
          const pairs = getSelectedPropertyPairs(values)
          return pairs.length !== 0
        },
        render (values) {
          const pairs = getSelectedPropertyPairs(values)
          if (pairs.length === 0) return null

          return pairs.map(({ label: propertyValueName, value: propertyPairId }) => {
            return (
              <Tag
                key={propertyPairId}
                closable
                onClose={() => {handleRemPropertyPair(leForm, name, propertyPairId, inputType, okFn)}}
              >
                {propertyValueName}
              </Tag>
            )
          })
        }
      }
    }

    return [{
        label,
        name,
        component: COMPONENT_ENUMS[inputType],
        follow: true,
        itemClassName: 'gp-properties-item',
        props: {
          ...restProps,
          required,
          className: 'gp-properties-comp'
        },
        rules: {
          ...restRules,
          required,
          message,
        }
      },
      customInputItem, // 自定义输入
      selectedTagItem // 已选标签
    ]
  })

  return [].concat(...result)
}

// 获取属性项表单配置
const getPropertiesConfig = (properties) => {
  return (leForm) => {
    return [
      ...getPropertiesWrap(leForm, properties),
    ]
  }
}

export {
  getPropertiesWrap
}

export default getPropertiesConfig
