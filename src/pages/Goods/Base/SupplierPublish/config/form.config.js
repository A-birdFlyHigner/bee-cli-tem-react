// 发布商品表单配置

import React from 'react'
import { Table, Button, Input } from 'antd'
import { LeForm } from '@lib/lepage'
import uploadConfig from './upload.config'
import categoryProperties from '../mock/categoryProperties'
const FN = () => {}

const getHeadConfig = (title) => {
  return {
    render () {
      return <div><b>{title}</b></div>
    }
  }
}

const getTipConfig = (msg) => {
  return {
    render () {
      return <div>{msg}</div>
    }
  }
}

const getSkusDataList = (chosenSkus) => {
  return chosenSkus.reduce((preOptions, curVal, index, arr) => {
    if (!preOptions || preOptions.length === 0) return curVal.options

    const result = preOptions.map(preOption => {
      return curVal.options.map(curOption => {
        const label = `${preOption.label}-${curOption.label}`
        const value = `${preOption.value}-${curOption.value}`
        return {
          key: value,
          label,
          value,
          status: true,
          sku: label,
          skuId: value,
          price: '',
          number: ''
        }
      })
    })

    return [].concat(...result)
  }, null)
}

// 选择类目
const categoryConfig = [
  {
    // TODO: 表单配配置，缺少 分类ID 的 value
    label: '当前选择类目',
    name: 'category',
    status: 'preview',
    follow: true
  },
  {
    component: 'Button',
    inline: true,
    when () {
      // 二次编辑商品，则不能修改类目，没有【修改类目】按钮
      return true
    },
    props: {
      children: '修改类目',
      onClick (err, values, leForm) {
        // 创建商品，二次编辑分类
        leForm.emit('edit-category', values)
      }
    }
  },
]

// 基础信息
const baseInfoConfig = [
  getHeadConfig('基础信息'),
  {
    name: 'longName',
    label: '商品长名称',
    component: 'Input',
    props: {
      required: true,
      maxLength: 40,
      placeholder: '请输入长名称',
      suffix: '简洁描述这是什么商品，展示在小程序端，限40字'
    },
    rules: {
      type: 'string',
      required: true,
      message: '长名称不能为空，40个汉字以内',
      max: 40
    }
  },
  {
    name: 'shortName',
    label: '商品短名称',
    props: {
      required: true,
      maxLength: 20,
      placeholder: '请输入短名称',
      suffix: '提炼文案，展示在小程序端的描述，限20字'
    },
    rules: {
      type: 'string',
      required: true,
      message: '短名称不能为空，20个汉字以内',
      max: 20
    }
  },
  {
    name: 'brandName',
    label: '品牌',
    props: {
      maxLength: 20,
      placeholder: '请填写品牌',
      suffix: '非必填，填写后将品牌信息展示在商品详情页面'
    },
    rules: {
      type: 'string',
      required: true,
      message: '品牌名不能超过20个字符',
      max: 20
    }
  }
]

// 销售属性
const getSalePropertiesConfig = (initSkus) => {

  // 更新sku组合
  const updateSkuCombs = (leForm) => {
    const skuCombs = leForm.getValue('skuCombs')

    leForm.setValue('skuCombs', skuCombs.concat(skuCombs))
  }

  // 触发单个更新操作
  const onChangeUpdateSingle = (leForm, colKey, inputVal, itemIndex) => {
    const skuCombs = leForm.getValue('skuCombs')
    const result = skuCombs.map((item, index) => {
      if (itemIndex !== index) {
        return item
      }
      return {
        ...item,
        [colKey]: inputVal
      }
    })
    leForm.setValues({
      skuCombs: result
    })
  }

  // 触发批量更新操作
  const onChangeUpdateBatch = (leForm, colKey, batchVal, batchKey) => {
    const skuCombs = leForm.getValue('skuCombs')
    const result = skuCombs.map((item) => {
      return {
        ...item,
        [colKey]: batchVal
      }
    })
    leForm.setValues({
      [batchKey]: batchVal,
      skuCombs: result
    })
  }

  // 触发选择规格操作
  const onChangeSkuChoose = (leForm, name, value) => {
    leForm.setValue(name, value)

    // 更新sku组合
    updateSkuCombs(leForm)
  }

  // 触发添加规格操作
  const onPressEnterAddSku = (leForm, name, event) => {
    const { target = {} } = event
    const { value: label = ''} = target
    if (!label) return

    const value = [].concat(leForm.getValue(name) || [])
    const props = leForm.getProps(name)
    const options = [].concat(props.options || [])
    const addValue = options.length + 1

    // add
    options.push({ label, value: addValue })
    value.push(addValue)

    // update
    leForm.setProps(name, { options })
    leForm.setValue(name, value)

    // clear
    target.value = ''

    // 更新sku组合
    updateSkuCombs(leForm)
  }

  // 获取sku列配置
  const getColumnsConfig = (leForm) => {
    return [
      {
        title: '状态',
        dataIndex: 'status',
        render () {
          return <Button>停售/可售</Button>
        }
      },
      {
        title: 'sku组合',
        dataIndex: 'sku',
      },
      {
        title: 'sku编码(发货编码)',
        dataIndex: 'skuId',
        component: "Input",
        render (value, arr, index) {
          return <Input value={value} onChange={(e) => onChangeUpdateSingle(leForm, 'skuId', e.target.value, index)} />
        }
      },
      {
        title: '成本价',
        dataIndex: 'price',
        render (value, arr, index) {
          return <Input value={value} onChange={(e) => onChangeUpdateSingle(leForm, 'price', e.target.value, index)} />
        }
      },
      {
        title: '限购数量',
        dataIndex: 'number',
        render (value, arr, index) {
          return <Input value={value} onChange={(e) => onChangeUpdateSingle(leForm, 'number', e.target.value, index)} />
        }
      }
    ]
  }

  // 获取sku选择器配置
  const getSkuChoosesConfig = (leForm) => {
    const result = initSkus.map(sku => {
      return [
        {
          label: sku.label,
          name: sku.name,
          component: 'CheckboxGroup',
          follow: true,
          props: {
            options: sku.options,
            onChange: (value) => onChangeSkuChoose(leForm, sku.name, value)
          },
          rules: {
            required: true,
            message: `请选择${sku.label}`,
          }
        },
        {
          inline: true,
          props: {
            placeholder: '自定义',
            onPressEnter: (event) => onPressEnterAddSku(leForm, sku.name, event)
          }
        }
      ]
    })

    return [].concat(...result)
  }

  const code69 = () => {
    return {
      label: '商品是否有69码',
      component: 'Checkbox'
    }
  }

  // 获取批量设置配置
  const getBatchConfig = (leForm) => {
    return [
      {
        label: '批量设置',
        name: 'batch-skuId',
        follow: true,
        props: {
          placeholder: '请输入sku编码',
          onChange: (e) => onChangeUpdateBatch(leForm, 'skuId', e.target.value, 'batch-skuId')
        }
      },
      {
        name: 'batch-price',
        inline: true,
        props: {
          placeholder: '请输入成本价',
          onChange: (e) => onChangeUpdateBatch(leForm, 'price', e.target.value, 'batch-price')
        }
      },
      {
        name: 'batch-number',
        inline: true,
        component: 'InputNumber',
        props: {
          placeholder: '请输入限购数量',
          onChange: (value) => onChangeUpdateBatch(leForm, 'number', value, 'batch-number')
        }
      }
    ]
  }

  // 获取sku组合配置
  const getSkuCombConfig = (leForm) => {
    return {
      name: 'skuCombs',
      render ({ skuCombs }) {
        const columns = getColumnsConfig(leForm)
        return <Table columns={columns} dataSource={skuCombs} pagination={false} />
      }
    }
  }

  return (leForm) => {
    return [
      getHeadConfig('销售属性'),
      getTipConfig('注：商品规格根据类目规定显示，支持0-2级，没有规格时可不填'),
      ...getSkuChoosesConfig(leForm, initSkus),
      code69(),
      ...getBatchConfig(leForm),
      getSkuCombConfig(leForm)
    ]
  }
}

// sku主图
const getSkuMainImageConfig = () => {
  const getFormConfig = (skuCombs) => {
    return {
      form: {
        inline: true,
      },
      items: [
        ...skuCombs.map((item, index) => {
          return uploadConfig({
            label: '黑色',
            props: {
              listType: 'picture-card',
              className: 'avatar-uploader',
            }
          })
        })
      ]
    }
  }

  return () => {
    return [
      getHeadConfig('sku主图'),
      getTipConfig('sku主图：必填，分辨率（常方式），文件小于400KB!'),
      {
        listenKeys: ['skuCombs'],
        render (values) {
          const formConfig = getFormConfig(values.skuCombs)
          return <LeForm {...formConfig} />
        }
      }
    ]
  }
}

// 商品属性
const goodsPropertiesConfig = [
  getHeadConfig('商品属性'),
  {
    label: '保质期',
    name: 'shelf-life',
    props: {
      required: true,
    }
  },
  getTipConfig('注：根据商品类目不同，展示商品属性字段不同。')
]

// 仓库属性
const getWarehousePropertiesConfig = () => {
  // 仓库相关的属性是根据类目来的
  const items = [{
    label: '毛重',
    name: 'weight'
  },
    {
      label: '质量',
      name: 'quality'
    }]
  return [
    getHeadConfig('仓库属性'),
    getTipConfig('注：仓库属性根据商品类目展示，仅仓库传输时使用，不展示在前端'),
    ...items
  ]
}

// 商品主图
const goodsMainImageConfig = [
  getHeadConfig('商品主图'),
  uploadConfig({
    label: '商品主图',
    name: 'goodsMainImage',
    props: {
      suffix: '必填，1-5张商品主图，分辨率xx,文件小于400KB)',
      required: true,
      listType: 'picture-card',
      className: 'avatar-uploader',
    }
  })
]

// 商品详情
const goodsDetailConfig = [
  uploadConfig({
    label: '商品详情',
    name: 'goodsDetailImage',
    props: {
      top: '必填，图片宽度最小限制尺寸620！',
      listType: 'picture-card',
      className: 'avatar-uploader'
    }
  })
]

// 底部按钮
const buttonsConfig = [
  {
    props: {
      type: 'primary',
      children: '保存',
      onClick(err, values, leForm) {}
    },
    options: {
      type: 'submit',
    },
  },
  {
    props: {
      children: '取消',
      onClick(err, values, leForm) {}
    },
  }
]

const initSkus = [
  {
    label: '颜色',
    name: 'sku-color',
    options: [{
      label: '黑色',
      value: 1
    }, {
      label: '白色',
      value: 2
    }]
  },
  {
    label: '尺码',
    name: 'sku-size',
    options: [{
      label: 'S码',
      value: 3
    }, {
      label: 'L码',
      value: 4
    }]
  }
]

// 属性项
const getPropertiesConfig = (properties) => {
  // 触发添加规格操作
  const onPressEnterAddSku = (leForm, name, event) => {
    const {
      target = {}
    } = event
    const {
      value: label = ''
    } = target
    if (!label) return

    const props = leForm.getProps(name)
    const options = [].concat(props.options || [])
    const addValue = options.length + 1

    // add
    options.push({
      label,
      value: addValue
    })

    // update
    leForm.setProps(name, {
      options
    })

    // clear
    target.value = ''
  }

  // 获取sku选择器配置
  const getConfig = (leForm) => {
    const COMPONENT_ENUMS = {
      1: 'Select',
      2: 'RadioGroup',
      3: 'CheckboxGroup',
      4: 'CheckboxGroup',
      5: 'Input',
      6: 'DatePicker',
      7: 'TimePicker'
    }
    const MESSAGE_PREFIX = {
      1: '请选择',
      2: '请选择',
      3: '请选择',
      4: '请选择',
      5: '请填写',
      6: '请输入',
      7: '请输入',
    }
    const result = properties.map(property => {

      const {
        propertyName: label,
        propertyNameId,
        propertyInputType,
        // propertyInputTypeEnum,
        propertyPairs = [],
        booleanIsRequired: required
      } = property

      const name = `${propertyNameId}`
      const restProps = {}
      let customConfig = null

      // 有选项
      if ([1, 2, 3, 4].indexOf(propertyInputType) !== -1) {
        restProps.options = propertyPairs.map(propertyPair => {
          return {
            label: propertyPair.pvName,
            value: propertyPair.propertyValueId,
          }
        })
      }

      // 2单选可自定义、4多选可自定义
      if ([2, 4].indexOf(propertyInputType) !== -1) {
        customConfig = {
          inline: true,
          props: {
            placeholder: '自定义',
            onPressEnter: (event) => onPressEnterAddSku(leForm, name, event)
          }
        }
      }

      // 错误提示消息前缀
      const messagePrefix = MESSAGE_PREFIX[propertyInputType]
      let onChange = FN

      // 2单选可定义、5输入框
      if ([2, 5].indexOf(propertyInputType) !== -1) {
        onChange = (event) => {
          leForm.setValue(name, event.target.value)
        }
      } else {
        onChange = (value) => {
          leForm.setValue(name, value)
        }
      }

      return [{
        label,
        name,
        component: COMPONENT_ENUMS[propertyInputType],
        follow: true,
        props: {
          ...restProps,
          required,
          onChange
        },
        rules: {
          required,
          message: `${messagePrefix}${property.propertyName}`,
        }
      },
        customConfig
      ]
    })

    return [].concat(...result)
  }

  return (leForm) => {
    return [
      getHeadConfig('属性项试验'),
      ...getConfig(leForm),
    ]
  }
}

export default {
  settings: {
    values: {
      skuCombs: getSkusDataList(initSkus)
    }
  },
  items: [
    categoryConfig, // 类目信息
    baseInfoConfig, // 基本信息
    getPropertiesConfig(categoryProperties.data.goodsProperties),
    getSalePropertiesConfig(initSkus), // 销售属性
    getSkuMainImageConfig(), // SKU主图
    goodsPropertiesConfig, // 商品属性
    getWarehousePropertiesConfig(), // 仓库属性
    goodsMainImageConfig, // 商品主图
    goodsDetailConfig // 商品详情
  ],
  buttons: buttonsConfig
}
