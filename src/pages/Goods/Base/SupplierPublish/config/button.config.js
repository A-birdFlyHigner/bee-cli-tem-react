import moment from 'moment';
import router from 'umi/router';
import { message as messageApi } from 'antd'
import { GOODS_PROPERTY_NAME_ID, WAREHOUSE_PROPERTY_NAME_ID } from './common.config'
import { trim, pick, omit, emptyFn, Cache } from '../utils'
import { createGoods, updateGoods } from '@/services/goods';

const buttonCache = Cache.create('button.config')
const isAMomentObject = '_isAMomentObject'

const getPropertyList = (values, prefix) => {
  const list = []

  for (const name in values) {
    // filter {goodsPropertyNameId|warehousePropertyNameId}-999
    if (name.indexOf(prefix) !== 0) continue

    const rawValue = values[name]
    if (rawValue === null || rawValue === undefined) continue

    const propertyNameId = name.split('-')[1]

    let propertyValue = []

    // 日期、时间
    if (typeof rawValue === 'object' && rawValue[isAMomentObject] === true) {
      // FIXME: 日期格式化后，会带上时间
      propertyValue = [{
        pvName: moment(rawValue._d).format('YYYY-MM-DD HH:mm:ss') // moment 格式化
      }]
    }
    // 文本框
    else if (typeof rawValue === 'string') {
      propertyValue = [{
        pvName: rawValue
      }]
    }
    // 单选（不可自定义、可自定义）
    else if (typeof rawValue === 'number') {
      propertyValue = [{
        id: rawValue
      }]
    }
    // 多选（不可自定义、可自定义）
    else if (rawValue instanceof Array && rawValue.length > 0) {
      propertyValue = rawValue.map(id => {
        return { id }
      })
    }

    list.push({
      propertyId: propertyNameId,
      propertyValue
    })
  }

  if (list.length === 0) return null
  return list
}

const formatOptions = [
  {
    name: 'saleGoodsId',
    handle: emptyFn,
  },
  {
    name: 'categoryId',
    handle: emptyFn,
  },
  {
    name: 'name',
    handle: trim,
  },
  {
    name: 'desc',
    handle: trim,
  },
  {
    name: 'brandName',
    handle: trim,
  },
  {
    name: 'has69',
    handle: (value) => {
      return value || false
    },
  },
  {
    name: 'salePropertyList', // from skus field
    proxyName: 'skus',
    handle: (list) => {
      return list.map(item => {
        const { costPrice } = item
        return {
          ...omit(item, ['key', 'propertyValueNames']),
          // 成本价乘以100，转成单位分
          costPrice: Number(costPrice) * 100
        }
      })
    },
  },
  {
    name: 'skuMainImageList',
    handle: (value, values, leForm) => {
      const list = leForm.getFormatValue('skuMainImageList')
      if (!list || list.length === 0) return null

      return list.map((item, index) => {
        return {
          // propertyPairId: '', // 属性对Id
          // id: 0, // 图片表Id
          ...pick(item, ['url', 'width', 'height', 'propertyPairId', 'id']),
          sortOrder: index + 1,
          type: 1, // 1 图片、 2 视频
        }
      })
    },
  },
  {
    name: 'goodsPropertyList',
    handle: (value, values) => {
      return getPropertyList(values, GOODS_PROPERTY_NAME_ID)
    },
  },
  {
    name: 'warehousePropertyList',
    handle: (value, values) => {
      return getPropertyList(values, WAREHOUSE_PROPERTY_NAME_ID)
    },
  },
  {
    name: 'goodsMainImageList',
    handle: (list) => {
      if (!list || list.length === 0) return null

      return list.map((item, index) => {
        return {
          ...pick(item, ['url', 'width', 'height']),
          order: index + 1,
          type: 1, // 1 商品主图
        }
      })
    },
  },
  {
    name: 'goodsDetailImageList',
    handle: (list) => {
      if (!list || list.length === 0) return null

      return list.map((item, index) => {
        return {
          ...pick(item, ['url', 'width', 'height']),
          order: index + 1,
          type: 2, // 2 商品详情图
        }
      })
    },
  }
]

const getFormatValues = (values, leForm) => {
  const formatValues = {}

  formatOptions
  .map((option) => {
    const { name, proxyName = name, handle = emptyFn } = option
    const value = values[proxyName]
    return {
      name,
      value: handle(value, values, leForm)
    }
  })
  .forEach(({ name, value }) => {
    if (value === null || value === undefined) {
      return
    }
    formatValues[name] = value
  })

  return formatValues
}

const switchAwait = (leForm, loading) => {
  leForm.setProps('footer-submit-button', {
    loading
  })
}

const handleCreate = async (leForm, values) => {
  const params = getFormatValues(values, leForm)
  const resData = await createGoods(params)

  if (!resData) {
    switchAwait(leForm, false)
    return
  }
  Cache.clear()
  messageApi.success('商品创建成功，正在跳转商品列表页！')
  setTimeout(() => {
    router.push('/goods/base/list')
  }, 2000)
}

const handleUpdate = async (leForm, values) => {
  const params = getFormatValues(values, leForm)
  const resData = await updateGoods(params)

  if (!resData) {
    switchAwait(leForm, false)
    return
  }
  Cache.clear()
  messageApi.success('商品更新成功，正在跳转商品列表页！')
  setTimeout(() => {
    router.push('/goods/base/list')
  }, 2000)
}

// 获取底部按钮表单配置
const getButtonsConfig = (globalOptions) => {
  const { status } = globalOptions
  return [{
      name: 'footer-submit-button',
      props: {
        type: 'primary',
        children: '保存',
        onClick: async (err, values, leForm) => {
          buttonCache.set('isSubmit', true)
          if (err) return
          switchAwait(leForm, true)
          if (status === 'update') {
            await handleUpdate(leForm, values)
          }
          else {
            await handleCreate(leForm, values)
          }
        }
      },
      options: {
        type: 'submit',
      },
    },
    {
      props: {
        children: '取消',
        onClick() {
          router.goBack()
        }
      },
    }
  ]
}

export default getButtonsConfig
