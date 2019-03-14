import React from 'react'
import { message as messageApi, Tag } from 'antd';
import { FN } from './common.config'
import { saveCategoryPropertyPair } from '@/services/goods'

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
const handleAddPropertyPair = async (leForm, name, event, okFn = FN) => {
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
    // add
    options.push({
      label,
      value: propertyPairId,
      isCustom: true
    })

    // update
    leForm.setProps(name, {
      options
    })

    // clear
    target.value = ''

    okFn()
  }
  target.disabled = false
}

// 删除属性对
const handleRemPropertyPair = (leForm, name, propertyPairId, okFn = FN) => {
  // update props
  const { options = [] } = leForm.getProps(name)
  const propertyPairs = options.filter(({ value }) => value !== propertyPairId)
  leForm.setProps(name, {
    options: propertyPairs
  })

  // update value
  const values = (leForm.getValue(name) || []).filter(value => value !== propertyPairId)
  leForm.setValue(name, values)

  // complete
  okFn()
}

// 修改属性对值
const handleChangeValue = (leForm, name, value, okFn = FN) => {
  leForm.setValue(name, value)
  okFn()
}

// 属性项包装
const getPropertiesWrap = (leForm, properties = [], options = {}) => {
  const { okFn = FN, namePrefix = 'pnId' } = options
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
    let customInputItem = null
    let selectedTagItem = null

    // 有选项
    if ([1, 2, 3, 4].indexOf(inputType) !== -1) {
      restProps.options = propertyPairs.map(propertyPair => {
        return {
          label: propertyPair.pvName,
          value: propertyPair.id
        }
      })
    }

    // 限制长度
    if ([5].indexOf(inputType) !== -1) {
      restProps.maxLength = 128
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
        const propertyPairIds = values[name] || []
        const { options: pairs } = leForm.getProps(name)

        return pairs.filter(propertyPair => {
          return propertyPair.isCustom && propertyPairIds.indexOf(propertyPair.value) !== -1
        })
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
                onClose={() => {handleRemPropertyPair(leForm, name, propertyPairId, okFn)}}
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
